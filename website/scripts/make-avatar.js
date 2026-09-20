import sharp from 'sharp';

async function createAvatar() {
  const inputPath = 'C:/Users/Luca Drogo/.gemini/antigravity/brain/3f2b54a2-2015-449d-a951-5ced1d451fae/.user_uploaded/media_1789925496942.jpg';
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  
  const width = info.width;
  const height = info.height;
  const visited = new Uint8Array(width * height);
  const isBg = new Uint8Array(width * height);
  
  const isCheckerPixel = (r, g, b) => {
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    return maxDiff < 10 && r > 210;
  };
  
  const queue = [];
  const addSeed = (x, y) => {
    const idx = y * width + x;
    if (!visited[idx]) {
      visited[idx] = 1;
      queue.push(x, y);
    }
  };
  
  for (let x = 0; x < width; x++) {
    addSeed(x, 0);
    addSeed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    addSeed(0, y);
    addSeed(width - 1, y);
  }
  
  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const idx = cy * width + cx;
    const pIdx = idx * 3;
    const r = data[pIdx];
    const g = data[pIdx + 1];
    const b = data[pIdx + 2];
    
    if (isCheckerPixel(r, g, b)) {
      isBg[idx] = 1;
      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1]
      ];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIdx = ny * width + nx;
          if (!visited[nIdx]) {
            visited[nIdx] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }
  
  // Create RGBA image with cut out alpha
  const rgba = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const sIdx = idx * 3;
      const dIdx = idx * 4;
      rgba[dIdx] = data[sIdx];
      rgba[dIdx + 1] = data[sIdx + 1];
      rgba[dIdx + 2] = data[sIdx + 2];
      rgba[dIdx + 3] = isBg[idx] ? 0 : 255;
    }
  }
  
  // Background SVG with cybernetic circular glow, studio lighting and dark aesthetic
  const bgSvg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="45%" stop-color="#0f172a" />
          <stop offset="75%" stop-color="#070a14" />
          <stop offset="100%" stop-color="#020408" />
        </radialGradient>
        <radialGradient id="rimGlow" cx="50%" cy="38%" r="48%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.32" />
          <stop offset="50%" stop-color="#818cf8" stop-opacity="0.16" />
          <stop offset="100%" stop-color="#020408" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)" />
      <circle cx="512" cy="400" r="460" fill="url(#rimGlow)" />
    </svg>
  `);
  
  const characterPng = await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();
  
  await sharp(bgSvg)
    .composite([
      { input: characterPng, top: 0, left: 0 }
    ])
    .png({ quality: 95 })
    .toFile('c:/Users/Luca Drogo/Documents/antigravity/vibrant-einstein/website/public/assets/brand/luc4n3x-avatar.png');

  await sharp(bgSvg)
    .composite([
      { input: characterPng, top: 0, left: 0 }
    ])
    .webp({ quality: 95 })
    .toFile('c:/Users/Luca Drogo/Documents/antigravity/vibrant-einstein/website/public/assets/brand/luc4n3x-avatar.webp');
    
  console.log('Avatar generated successfully!');
}

createAvatar();
