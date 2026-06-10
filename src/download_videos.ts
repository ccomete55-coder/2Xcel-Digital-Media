import * as fs from 'fs';
import * as path from 'path';

const videos = [
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-charming-woman-wearing-a-beautiful-white-dress-34404-large.mp4',
    dest: 'The Enchanted Closet-Lace Cuff Jean.mp4'
  },
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-posing-with-a-chic-white-blazer-34394-large.mp4',
    dest: 'Enchanted Closet AD.mp4'
  },
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-beautiful-white-dress-and-walking-in-slow-motion-34399-large.mp4',
    dest: 'Enchanted Closet product AD.mp4'
  }
];

async function download(url: string, destPath: string) {
  console.log(`Downloading ${url} -> ${destPath}`);
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://mixkit.co/'
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText} (${response.status})`);
  }
  const arrayBuffer = await response.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
  console.log(`Successfully saved ${destPath} [size: ${(arrayBuffer.byteLength / 1024 / 1024).toFixed(2)} MB]`);
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (const video of videos) {
    const destPath = path.join(publicDir, video.dest);
    try {
      await download(video.url, destPath);
    } catch (err: any) {
      console.error(`Error downloading ${video.dest}:`, err.message || err);
    }
  }
  console.log('--- ALL DOWNLOADS ATTEMPTED ---');
}

main();
