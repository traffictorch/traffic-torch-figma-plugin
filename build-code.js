const fs = require('fs');
const path = require('path');

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

console.log('📦 Building dist/code.js...');
fs.copyFileSync('src/code.ts', 'dist/code.js');
console.log('✅ dist/code.js created successfully');
