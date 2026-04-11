const fs = require('fs');
if (!fs.existsSync('dist')) fs.mkdirSync('dist', { recursive: true });

console.log('📦 Copying code.js...');
fs.copyFileSync('src/code.ts', 'dist/code.js');
console.log('✅ dist/code.js created');

console.log('📦 Ensuring ui.html exists...');
if (fs.existsSync('dist/index.html')) {
  fs.renameSync('dist/index.html', 'dist/ui.html');
  console.log('✅ dist/ui.html ready for Figma');
}
