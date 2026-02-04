const fs = require('fs');
const path = require('path');

// PascalCase yaratish
function toPascalCase(str) {
  return str
    .split(/[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// Component template
function generateComponentTemplate(componentName, isPage = false) {
  const imports = isPage
    ? `import Head from 'next/head';
import React, { ReactElement } from 'react';
import { projectName, SITE_URL } from '@/data/const';
import HeroSection from '@components/hero-section';
import { Container } from '@components/container';
import Footer from '@/widgets/landing/footer';
import Header from '@/widgets/landing/header';
import AntdProvider from '@hocs/antd-provider';`
    : `import React from 'react';`;

  const componentContent = isPage
    ? `export default function ${componentName}() {
  return (
    <>
      <Head>
        <title>${componentName} — {projectName}</title>
        <meta name="description" content="${componentName} sahifasi" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={\`${componentName} — \${projectName}\`} />
        <meta property="og:description" content="${componentName} sahifasi" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={\`\${SITE_URL}/${componentName.toLowerCase()}\`} />
        <link rel="canonical" href={\`\${SITE_URL}/${componentName.toLowerCase()}\`} />
      </Head>

      <Header />

      <div className="min-h-screen relative overflow-hidden bg-white dark:bg-dark">
        <div className="pt-16 relative z-10">
          <HeroSection
            backgroundImage={'/images/blog.jpg'}
            title="${componentName}"
            description="${componentName} sahifasi"
          />

          <article className="mx-auto max-w-7xl py-12">
            <Container>
              {/* Content */}
            </Container>
          </article>
        </div>

        <Footer />
      </div>
    </>
  );
}

${componentName}.getLayout = function getLayout(page: ReactElement) {
  return <AntdProvider>{page}</AntdProvider>;
};`
    : `interface ${componentName}Props {
  // Props bu yerda
}

export default function ${componentName}({}: ${componentName}Props) {
  return (
    <div className="${componentName.toLowerCase()}">
      {/* Component content */}
    </div>
  );
}`;

  return `${imports}

${componentContent}
`;
}

// CLI dan ishlatish
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
⚛️  Component Generator

Foydalanish:
  node scripts/generate-component.js <component-name> [--page] [--path]

Misol:
  node scripts/generate-component.js MyComponent
  node scripts/generate-component.js AboutPage --page
  node scripts/generate-component.js UserCard --path src/components/cards

Options:
  --page    Sahifa komponenti yaratish (pages folder)
  --path    Custom path (default: src/components)
    `);
    process.exit(0);
  }

  const componentName = toPascalCase(args[0]);
  const isPage = args.includes('--page');
  const pathIndex = args.indexOf('--path');
  const customPath = pathIndex !== -1 && args[pathIndex + 1] ? args[pathIndex + 1] : null;

  // Path aniqlash
  let targetDir;
  let fileName;
  
  if (isPage) {
    targetDir = path.join(__dirname, '../src/pages');
    fileName = `${componentName.toLowerCase()}.tsx`;
  } else {
    targetDir = customPath
      ? path.join(__dirname, '..', customPath)
      : path.join(__dirname, '../src/components');
    fileName = `${componentName}.tsx`;
  }

  const filePath = path.join(targetDir, fileName);

  // Folder yaratish
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Fayl mavjudligini tekshirish
  if (fs.existsSync(filePath)) {
    console.error(`❌ Fayl allaqachon mavjud: ${filePath}`);
    process.exit(1);
  }

  // Component yaratish
  const content = generateComponentTemplate(componentName, isPage);
  fs.writeFileSync(filePath, content, 'utf-8');

  console.log(`\n✅ ${isPage ? 'Sahifa' : 'Component'} yaratildi!`);
  console.log(`📁 Fayl: ${filePath}`);
  console.log(`📝 Komponent: ${componentName}\n`);
}

module.exports = { generateComponentTemplate, toPascalCase };
