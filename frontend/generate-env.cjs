const fs = require('fs');

const env = {
  API_URL: process.env.API_URL,
  WEBSITE_PASSWORD: process.env.WEBSITE_PASSWORD
};

const content = `window.ENV = ${JSON.stringify(env, null, 2)};\n`;

fs.writeFileSync('dist/env.js', content);