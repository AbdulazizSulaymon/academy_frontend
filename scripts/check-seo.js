const fs = require('fs');
const path = require('path');

// Fayllarni topish
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

// TSX/TSX fayllarni topish
function getPageFiles(files) {
  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return (ext === '.tsx' || ext === '.ts') && !file.includes('_app') && !file.includes('_document');
  });
}

// SEO tekshirish
function checkSEO(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];
  const warnings = [];

  // Head komponenti tekshirish
  if (!content.includes('<Head>') && !content.includes('from \'next/head\'')) {
    warnings.push('Head komponenti topilmadi');
  }

  // Title tekshirish
  if (!content.includes('<title>') && !content.includes('og:title')) {
    issues.push('Title meta tag topilmadi');
  }

  // Description tekshirish
  if (!content.includes('description') || !content.includes('meta name="description"')) {
    issues.push('Description meta tag topilmadi');
  }

  // Open Graph tekshirish
  if (!content.includes('og:title')) {
    warnings.push('Open Graph title topilmadi');
  }
  if (!content.includes('og:description')) {
    warnings.push('Open Graph description topilmadi');
  }
  if (!content.includes('og:image')) {
    warnings.push('Open Graph image topilmadi');
  }

  // Canonical URL tekshirish
  if (!content.includes('canonical')) {
    warnings.push('Canonical URL topilmadi');
  }

  return { issues, warnings };
}

// Asosiy funksiya
function checkAllPages() {
  const pagesDir = path.join(__dirname, '../src/pages');
  const allFiles = getAllFiles(pagesDir);
  const pageFiles = getPageFiles(allFiles);

  console.log(`\n🔍 ${pageFiles.length} ta sahifa topildi\n`);

  let totalIssues = 0;
  let totalWarnings = 0;

  pageFiles.forEach((filePath) => {
    const relativePath = path.relative(pagesDir, filePath);
    const { issues, warnings } = checkSEO(filePath);

    if (issues.length > 0 || warnings.length > 0) {
      console.log(`📄 ${relativePath}`);
      
      if (issues.length > 0) {
        issues.forEach((issue) => {
          console.log(`   ❌ ${issue}`);
          totalIssues++;
        });
      }
      
      if (warnings.length > 0) {
        warnings.forEach((warning) => {
          console.log(`   ⚠️  ${warning}`);
          totalWarnings++;
        });
      }
      console.log('');
    }
  });

  console.log('='.repeat(60));
  console.log(`📊 Jami: ${totalIssues} ta muammo, ${totalWarnings} ta ogohlantirish`);
  console.log('='.repeat(60) + '\n');
}

if (require.main === module) {
  checkAllPages();
}

module.exports = { checkSEO, checkAllPages };
