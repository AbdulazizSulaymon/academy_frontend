const fs = require('fs');
const path = require('path');

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

// Fayl hajmini olish
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

// Folder hajmini hisoblash
function getFolderSize(folderPath) {
  const files = getAllFiles(folderPath);
  return files.reduce((total, file) => total + getFileSize(file), 0);
}

// Asosiy funksiya
function analyzeFileSizes(targetPath = null) {
  const rootPath = path.join(__dirname, '..');
  const foldersToCheck = targetPath
    ? [targetPath]
    : [
        'public/images',
        'public',
        'src',
        '.next',
      ];

  console.log('\n📊 Fayl Hajmlari Tahlili\n');
  console.log('='.repeat(60));

  foldersToCheck.forEach((folder) => {
    const folderPath = path.join(rootPath, folder);
    if (!fs.existsSync(folderPath)) {
      console.log(`⚠️  ${folder}: Topilmadi`);
      return;
    }

    const size = getFolderSize(folderPath);
    const files = getAllFiles(folderPath);
    
    console.log(`\n📁 ${folder}`);
    console.log(`   Fayllar: ${files.length}`);
    console.log(`   Jami hajm: ${formatBytes(size)}`);

    // Eng katta fayllar
    const fileSizes = files
      .map((file) => ({
        path: file,
        size: getFileSize(file),
      }))
      .sort((a, b) => b.size - a.size)
      .slice(0, 10);

    if (fileSizes.length > 0) {
      console.log(`\n   Top 10 eng katta fayllar:`);
      fileSizes.forEach((file, index) => {
        const relativePath = path.relative(rootPath, file.path);
        console.log(`   ${index + 1}. ${formatBytes(file.size).padEnd(12)} - ${relativePath}`);
      });
    }
  });

  console.log('\n' + '='.repeat(60) + '\n');
}

// CLI dan ishlatish
if (require.main === module) {
  const args = process.argv.slice(2);
  const targetPath = args[0] || null;
  analyzeFileSizes(targetPath);
}

module.exports = { analyzeFileSizes, getFolderSize };
