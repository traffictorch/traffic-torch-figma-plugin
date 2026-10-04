const fs = require('fs');
const path = require('path');

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

console.log('📦 Copying code.ts → dist/code.js...');
fs.copyFileSync('src/code.ts', 'dist/code.js');
console.log('✅ dist/code.js created');

console.log('📦 Ensuring ui.html is ready...');
if (fs.existsSync('ui.html')) {
  // keep root ui.html as the source of truth
  console.log('✅ ui.html already exists in root');
} else if (fs.existsSync('dist/index.html')) {
  fs.renameSync('dist/index.html', 'dist/ui.html');
  console.log('✅ Renamed index.html → ui.html');
}
