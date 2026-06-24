const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function run() {
  await download('https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1920&auto=format&fit=crop', path.join(dir, 'club-techno.jpg'));
  await download('https://images.unsplash.com/photo-1566404394190-cda8c620121c?q=80&w=1920&auto=format&fit=crop', path.join(dir, 'rooftop-luxury.jpg'));
  await download('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920&auto=format&fit=crop', path.join(dir, 'mag-cafe.jpg'));
  console.log('Images downloaded');
}

run();
