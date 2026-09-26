const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const directories = ['projects', 'services', 'videos'];

console.log('🎬 Starting Video Optimization (Web Fast Start)...');

directories.forEach(dir => {
  const targetDir = path.join(publicDir, dir);
  if (!fs.existsSync(targetDir)) return;

  const files = fs.readdirSync(targetDir);
  
  files.forEach(file => {
    if (file.toLowerCase().endsWith('.mp4') || file.toLowerCase().endsWith('.mov')) {
      const inputPath = path.join(targetDir, file);
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const outputPath = path.join(targetDir, `${name}_optimized.mp4`);

      console.log(`\n⚙️ Processing: ${file}...`);
      
      try {
        // -vcodec copy -acodec copy: Copies the streams without re-encoding (extremely fast)
        // -movflags +faststart: Moves the moov atom to the front for instant web playback
        execSync(`ffmpeg -y -i "${inputPath}" -c copy -movflags +faststart "${outputPath}"`, { stdio: 'pipe' });
        
        // Replace original with optimized version
        fs.unlinkSync(inputPath);
        fs.renameSync(outputPath, path.join(targetDir, `${name}.mp4`)); // Force .mp4 extension
        
        console.log(`✅ Success: ${file} is now Web Optimized!`);
      } catch (err) {
        console.error(`❌ Failed to process ${file}:`, err.message);
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      }
    }
  });
});

console.log('\n🎉 All local videos optimized for web streaming!');
