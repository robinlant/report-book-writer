const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const outputPath = path.join(distDir, 'env.js');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const env = {
  API_URL: process.env.API_URL,
  WEBSITE_PASSWORD: process.env.WEBSITE_PASSWORD
};

const content = `window.ENV = ${JSON.stringify(env, null, 2)};\n`;

fs.writeFileSync(outputPath, content);