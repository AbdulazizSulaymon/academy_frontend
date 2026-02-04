#!/usr/bin/env node

/**
 * Manifest.json generator script
 * Bu skript const.ts dan ma'lumotlarni olib, manifest.json yaratadi
 */

const fs = require('fs');
const path = require('path');

// Paths
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const manifestPath = path.join(publicDir, 'manifest.json');

// Environment variables yoki default values
const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || 'Algorismic';
const themeColor = process.env.NEXT_PUBLIC_THEME_COLOR || '#03E99E';
const backgroundColor = process.env.NEXT_PUBLIC_BACKGROUND_COLOR || '#ffffff';

// Icon sizes
const iconSizes = [192, 256, 384, 512];

// Manifest object
const manifest = {
  theme_color: themeColor,
  background_color: backgroundColor,
  display: 'standalone',
  scope: '/',
  start_url: '/',
  name: projectName,
  short_name: projectName,
  icons: iconSizes.map((size) => ({
    src: `/icon-${size}x${size}.png`,
    sizes: `${size}x${size}`,
    type: 'image/png',
  })),
  description:
    'Algorismic - IT outsource kompaniya. Web, mobile, desktop ilovalar ishlab chiqish. Startup yaratish va rivojlantirish xizmatlari.',
};

// Manifest.json yozish
try {
  // public papkasini tekshirish
  if (!fs.existsSync(publicDir)) {
    console.error(`❌ Xato: ${publicDir} papkasi topilmadi!`);
    process.exit(1);
  }

  // Manifest.json yozish
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

  console.log('✅ manifest.json muvaffaqiyatli yaratildi!');
  console.log(`📁 Manzil: ${manifestPath}`);
  console.log('');
  console.log('Manifest ma\'lumotlari:');
  console.log(`  - Name: ${manifest.name}`);
  console.log(`  - Theme Color: ${manifest.theme_color}`);
  console.log(`  - Background Color: ${manifest.background_color}`);
  console.log(`  - Icons: ${iconSizes.length} ta (${iconSizes.join(', ')}px)`);
} catch (error) {
  console.error('❌ Xato:', error.message);
  process.exit(1);
}
