const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const sharp = require('sharp');

// Rasm formatlari
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];

// FFmpeg mavjudligini tekshirish
function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Compress sozlamalari
const COMPRESS_OPTIONS = {
  jpeg: {
    quality: 85,
    mozjpeg: true,
  },
  png: {
    quality: 85,
    compressionLevel: 9,
  },
  webp: {
    quality: 85,
  },
};

// Fayl hajmini formatlash
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Rekursiv fayllarni topish
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Rasm fayllarini filter qilish
function getImageFiles(files) {
  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  });
}

// Video fayllarini filter qilish
function getVideoFiles(files) {
  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return VIDEO_EXTENSIONS.includes(ext);
  });
}

// Size string ni bytes ga o'zgartirish (1MB, 500KB, 2GB)
function parseSize(sizeStr) {
  if (!sizeStr) return null;
  
  const units = {
    'b': 1,
    'kb': 1024,
    'mb': 1024 * 1024,
    'gb': 1024 * 1024 * 1024,
  };

  const match = sizeStr.toLowerCase().match(/^(\d+(?:\.\d+)?)\s*(b|kb|mb|gb)?$/);
  if (!match) return null;

  const value = parseFloat(match[1]);
  const unit = match[2] || 'b';
  
  return Math.round(value * (units[unit] || 1));
}

// Fayllarni size bo'yicha filter qilish
function filterBySize(files, minSize = null, maxSize = null) {
  if (!minSize && !maxSize) return files;

  return files.filter((file) => {
    const stats = fs.statSync(file);
    const fileSize = stats.size;

    if (minSize && fileSize < minSize) return false;
    if (maxSize && fileSize > maxSize) return false;

    return true;
  });
}

// Videoni compress qilish
async function compressVideo(inputPath, outputPath, options = {}) {
  const stats = fs.statSync(inputPath);
  const originalSize = stats.size;
  const crf = options.crf || 28; // CRF: 18-28 (kichik = yaxshi sifat, katta = kichik hajm)
  const preset = options.preset || 'medium'; // ultrafast, fast, medium, slow, veryslow

  return new Promise((resolve) => {
    try {
      // FFmpeg command
      const ffmpegArgs = [
        '-i', inputPath,
        '-c:v', 'libx264',
        '-crf', crf.toString(),
        '-preset', preset,
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        '-y', // Overwrite output file
        outputPath,
      ];

      const ffmpeg = spawn('ffmpeg', ffmpegArgs);
      let errorOutput = '';

      ffmpeg.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      ffmpeg.on('close', (code) => {
        if (code === 0 && fs.existsSync(outputPath)) {
          const newStats = fs.statSync(outputPath);
          const newSize = newStats.size;
          const saved = originalSize - newSize;
          const savedPercent = ((saved / originalSize) * 100).toFixed(2);

          resolve({
            success: true,
            originalSize,
            newSize,
            saved,
            savedPercent,
          });
        } else {
          resolve({
            success: false,
            error: `FFmpeg xatolik kodi: ${code}`,
          });
        }
      });

      ffmpeg.on('error', (error) => {
        resolve({
          success: false,
          error: error.message,
        });
      });
    } catch (error) {
      resolve({
        success: false,
        error: error.message,
      });
    }
  });
}

// Rasmni compress qilish
async function compressImage(inputPath, outputPath, options = {}) {
  const ext = path.extname(inputPath).toLowerCase();
  const stats = fs.statSync(inputPath);
  const originalSize = stats.size;

  try {
    let sharpInstance = sharp(inputPath);

    // Optional resize (keep aspect ratio) when image is very large
    // Example: --max-dimension 2000  => if width/height > 2000, scale down proportionally
    if (options.maxDimension) {
      const maxDim = Number(options.maxDimension);
      if (Number.isFinite(maxDim) && maxDim > 0) {
        const metadata = await sharpInstance.metadata();
        const width = metadata.width || 0;
        const height = metadata.height || 0;

        if (width > maxDim || height > maxDim) {
          sharpInstance = sharpInstance.resize({
            width: maxDim,
            height: maxDim,
            fit: 'inside',
            withoutEnlargement: true,
          });
        }
      }
    }

    // Format bo'yicha compress
    if (ext === '.jpg' || ext === '.jpeg') {
      sharpInstance = sharpInstance.jpeg({
        quality: options.quality || COMPRESS_OPTIONS.jpeg.quality,
        mozjpeg: COMPRESS_OPTIONS.jpeg.mozjpeg,
      });
    } else if (ext === '.png') {
      sharpInstance = sharpInstance.png({
        quality: options.quality || COMPRESS_OPTIONS.png.quality,
        compressionLevel: COMPRESS_OPTIONS.png.compressionLevel,
      });
    } else if (ext === '.webp') {
      sharpInstance = sharpInstance.webp({
        quality: options.quality || COMPRESS_OPTIONS.webp.quality,
      });
    }

    // Compress qilish
    await sharpInstance.toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const saved = originalSize - newSize;
    const savedPercent = ((saved / originalSize) * 100).toFixed(2);

    return {
      success: true,
      originalSize,
      newSize,
      saved,
      savedPercent,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Asosiy funksiya
async function compressImages(folderPath, options = {}) {
  const backup = options.backup ?? false;
  const quality = options.quality ?? null;
  const overwrite = options.overwrite ?? true;
  const outputDir = options.outputDir ?? null;
  let includeVideos = options.includeVideos ?? false;
  const onlyVideos = options.onlyVideos ?? false;
  const videoCrf = options.videoCrf ?? 28;
  const videoPreset = options.videoPreset ?? 'medium';
  const minSize = options.minSize ?? null;
  const maxSize = options.maxSize ?? null;
  const maxDimension = options.maxDimension ?? null;

  // Folder mavjudligini tekshirish
  if (!fs.existsSync(folderPath)) {
    console.error(`❌ Folder topilmadi: ${folderPath}`);
    process.exit(1);
  }

  console.log(`\n📁 Folder: ${folderPath}`);
  console.log(`🔍 Fayllarni qidiryapman...\n`);

  // only-videos bo'lsa video ni yoqamiz
  if (onlyVideos) {
    includeVideos = true;
  }

  // FFmpeg tekshirish (video uchun)
  let hasFFmpeg = false;
  if (includeVideos) {
    hasFFmpeg = checkFFmpeg();
    if (!hasFFmpeg) {
      if (onlyVideos) {
        console.error('❌ FFmpeg topilmadi. --only-videos ishlashi uchun FFmpeg o\'rnatilgan bo\'lishi kerak.');
        console.error('   O\'rnatish: https://ffmpeg.org/download.html\n');
        process.exit(1);
      } else {
        console.log(
          '⚠️  FFmpeg topilmadi. Videolarni compress qilish uchun FFmpeg o\'rnatilgan bo\'lishi kerak.'
        );
        console.log('   O\'rnatish: https://ffmpeg.org/download.html\n');
        includeVideos = false;
      }
    } else {
      console.log('✅ FFmpeg topildi\n');
    }
  }

  // Barcha fayllarni topish
  const allFiles = getAllFiles(folderPath);
  let imageFiles = onlyVideos ? [] : getImageFiles(allFiles);
  let videoFiles = includeVideos ? getVideoFiles(allFiles) : [];

  // Size filter qo'llash
  if (minSize || maxSize) {
    const beforeImageCount = imageFiles.length;
    const beforeVideoCount = videoFiles.length;

    imageFiles = filterBySize(imageFiles, minSize, maxSize);
    videoFiles = filterBySize(videoFiles, minSize, maxSize);

    if (minSize || maxSize) {
      const minSizeStr = minSize ? formatBytes(minSize) : '0';
      const maxSizeStr = maxSize ? formatBytes(maxSize) : '∞';
      console.log(`📏 Size filter: ${minSizeStr} - ${maxSizeStr}`);
      
      if (beforeImageCount > imageFiles.length) {
        console.log(`   ℹ️  ${beforeImageCount - imageFiles.length} ta rasm fayli filterdan o'tmadi`);
      }
      if (beforeVideoCount > videoFiles.length) {
        console.log(`   ℹ️  ${beforeVideoCount - videoFiles.length} ta video fayli filterdan o'tmadi`);
      }
      console.log('');
    }
  }

  if (imageFiles.length === 0 && videoFiles.length === 0) {
    console.log('❌ Rasm yoki video fayllari topilmadi yoki filterdan o\'tmadi!');
    return;
  }

  if (imageFiles.length > 0) {
    console.log(`✅ ${imageFiles.length} ta rasm fayli compress qilinadi`);
  }
  if (videoFiles.length > 0) {
    console.log(`✅ ${videoFiles.length} ta video fayli compress qilinadi`);
  }
  console.log('');

  // Backup folder yaratish
  let backupPath = null;
  if (backup) {
    backupPath = path.join(folderPath, 'backup');
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true });
      console.log(`💾 Backup folder yaratildi: ${backupPath}\n`);
    }
  }

  // Output folder
  const outputPath = outputDir || folderPath;

  // Statistikalar
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let successCount = 0;
  let failCount = 0;
  const allFilesToProcess = [...imageFiles, ...videoFiles];
  const totalFiles = allFilesToProcess.length;

  // Har bir faylni compress qilish
  for (let i = 0; i < allFilesToProcess.length; i++) {
    const filePath = allFilesToProcess[i];
    const fileName = path.basename(filePath);
    const relativePath = path.relative(folderPath, filePath);
    const ext = path.extname(filePath).toLowerCase();
    const isVideo = VIDEO_EXTENSIONS.includes(ext);
    const fileType = isVideo ? '🎥 Video' : '🖼️  Rasm';

    console.log(`[${i + 1}/${totalFiles}] ${fileType}: ${relativePath}`);

    try {
      // Backup qilish
      if (backup) {
        const backupFilePath = path.join(backupPath, relativePath);
        const backupDir = path.dirname(backupFilePath);
        if (!fs.existsSync(backupDir)) {
          fs.mkdirSync(backupDir, { recursive: true });
        }
        fs.copyFileSync(filePath, backupFilePath);
      }

      // Output path
      let finalOutputPath;
      if (outputDir) {
        const outputFilePath = path.join(outputDir, relativePath);
        const outputDirPath = path.dirname(outputFilePath);
        if (!fs.existsSync(outputDirPath)) {
          fs.mkdirSync(outputDirPath, { recursive: true });
        }
        finalOutputPath = outputFilePath;
      } else {
        finalOutputPath = filePath;
      }

      // Compress qilish
      let result;
      if (isVideo) {
        result = await compressVideo(filePath, finalOutputPath, {
          crf: videoCrf,
          preset: videoPreset,
        });
      } else {
        result = await compressImage(filePath, finalOutputPath, { quality, maxDimension });
      }

      if (result.success) {
        totalOriginalSize += result.originalSize;
        totalNewSize += result.newSize;
        successCount++;

        console.log(
          `   ✅ ${formatBytes(result.originalSize)} → ${formatBytes(result.newSize)} (${result.savedPercent}% kamaytirildi)`
        );
      } else {
        failCount++;
        console.log(`   ❌ Xatolik: ${result.error}`);
      }
    } catch (error) {
      failCount++;
      console.log(`   ❌ Xatolik: ${error.message}`);
    }

    console.log('');
  }

  // Natijalar
  console.log('\n' + '='.repeat(60));
  console.log('📊 NATIJALAR');
  console.log('='.repeat(60));
  console.log(`✅ Muvaffaqiyatli: ${successCount}`);
  console.log(`❌ Xatoliklar: ${failCount}`);
  console.log(`📦 Jami hajm: ${formatBytes(totalOriginalSize)} → ${formatBytes(totalNewSize)}`);
  const totalSaved = totalOriginalSize - totalNewSize;
  const totalSavedPercent = totalOriginalSize > 0 ? ((totalSaved / totalOriginalSize) * 100).toFixed(2) : 0;
  console.log(`💾 Jami tejaldi: ${formatBytes(totalSaved)} (${totalSavedPercent}%)`);
  console.log('='.repeat(60) + '\n');
}

// CLI dan ishlatish
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📸 Rasm va Video Compress Script

Foydalanish:
  node scripts/compress-images.js <folder-path> [options]

Misol:
  node scripts/compress-images.js public/images
  node scripts/compress-images.js public/images --backup
  node scripts/compress-images.js public/images --quality 80
  node scripts/compress-images.js public/images --output compressed
  node scripts/compress-images.js public/images --videos
  node scripts/compress-images.js public/images --videos --video-crf 28
  node scripts/compress-images.js public/videos --only-videos
  node scripts/compress-images.js public/videos --only-videos --video-crf 28 --video-preset slow
  node scripts/compress-images.js public/images --max-dimension 2000
  node scripts/compress-images.js public/images --min-size 1MB
  node scripts/compress-images.js public/images --max-size 10MB
  node scripts/compress-images.js public/images --min-size 500KB --max-size 5MB

Options:
  --backup          Original fayllarni backup qilish
  --quality <num>   Rasm sifat (1-100, default: 85)
  --videos          Videolarni ham compress qilish (FFmpeg kerak)
  --only-videos     Faqat videolarni compress qilish (rasmlar skip, FFmpeg shart)
  --video-crf <num> Video CRF (18-28, default: 28, kichik = yaxshi sifat)
  --video-preset    Video preset (ultrafast|fast|medium|slow|veryslow, default: medium)
  --max-dimension   Rasmlarni proporsiya saqlab kichraytirish (px). Masalan: 2000
  --min-size <size> Minimal hajm (1MB, 500KB, 2GB - faqat shundan kattalarni compress qiladi)
  --max-size <size> Maksimal hajm (10MB, 2GB - faqat shundan kichiklarini compress qiladi)
  --output <path>   Output folder (default: original folder)

Eslatma: Videolarni compress qilish uchun FFmpeg o'rnatilgan bo'lishi kerak.
         O'rnatish: https://ffmpeg.org/download.html
    `);
    process.exit(0);
  }

  const folderPath = args[0];
  const options = {};

  // Options ni parse qilish
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--backup') {
      options.backup = true;
    } else if (args[i] === '--quality' && args[i + 1]) {
      options.quality = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      options.outputDir = args[i + 1];
      i++;
    } else if (args[i] === '--videos') {
      options.includeVideos = true;
    } else if (args[i] === '--only-videos') {
      options.onlyVideos = true;
      options.includeVideos = true;
    } else if (args[i] === '--video-crf' && args[i + 1]) {
      options.videoCrf = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--video-preset' && args[i + 1]) {
      options.videoPreset = args[i + 1];
      i++;
    } else if (args[i] === '--max-dimension' && args[i + 1]) {
      options.maxDimension = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--min-size' && args[i + 1]) {
      const minSizeBytes = parseSize(args[i + 1]);
      if (minSizeBytes === null) {
        console.error(`❌ Noto'g'ri min-size format: ${args[i + 1]}`);
        console.error('   To\'g\'ri format: 1MB, 500KB, 2GB, 1024');
        process.exit(1);
      }
      options.minSize = minSizeBytes;
      i++;
    } else if (args[i] === '--max-size' && args[i + 1]) {
      const maxSizeBytes = parseSize(args[i + 1]);
      if (maxSizeBytes === null) {
        console.error(`❌ Noto'g'ri max-size format: ${args[i + 1]}`);
        console.error('   To\'g\'ri format: 1MB, 500KB, 2GB, 1024');
        process.exit(1);
      }
      options.maxSize = maxSizeBytes;
      i++;
    }
  }

  compressImages(folderPath, options).catch((error) => {
    console.error('❌ Xatolik:', error);
    process.exit(1);
  });
}

module.exports = { compressImages };
