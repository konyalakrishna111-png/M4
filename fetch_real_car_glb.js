const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function download(url) {
  return new Promise((resolve, reject) => {
    const req = (url.startsWith('https') ? https : http).get(
      url,
      { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return resolve({ success: false, status: res.statusCode });
        }
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => resolve({ success: true, data: Buffer.concat(chunks) }));
      }
    );
    req.on('error', (err) => resolve({ success: false, error: err }));
  });
}

async function main() {
  const targetPath = path.join(__dirname, 'public', 'models', 'bmw-m4.glb');
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  const urls = [
    // 1. Three.js official sports car GLB
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/ferrari.glb',
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/ferrari.glb',
    // 2. PMNDRS Market assets car models
    'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/car/model.gltf',
    // 3. Khronos Sample Assets
    'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb',
    // 4. Barons / pmndrs 3D assets
    'https://raw.githubusercontent.com/pmndrs/drei-assets/master/car.glb'
  ];

  for (const url of urls) {
    console.log(`Checking ${url}...`);
    const res = await download(url);
    if (res.success && res.data.length > 50000) {
      console.log(`Downloaded ${res.data.length} bytes from ${url}`);
      fs.writeFileSync(targetPath, res.data);
      console.log(`Saved GLB asset to ${targetPath}`);
      return;
    } else {
      console.log(`Failed or small payload from ${url}:`, res.status || res.error);
    }
  }

  console.error('Could not download any GLB file');
}

main();
