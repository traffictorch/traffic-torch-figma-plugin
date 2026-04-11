const fs = require('fs');
if (!fs.existsSync('dist')) fs.mkdirSync('dist', { recursive: true });

console.log('📦 Copying code.js...');
fs.copyFileSync('src/code.ts', 'dist/code.js');   // now plain JS

console.log('📦 Renaming index.html → ui.html for Figma...');
if (fs.existsSync('dist/index.html')) {
  fs.renameSync('dist/index.html', 'dist/ui.html');
  console.log('✅ dist/ui.html created');
}
