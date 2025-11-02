// Script to copy assets to public folder for React
const fs = require('fs');
const path = require('path');

const assets = [
    'bg.png',
    'overlay1.png',
    'distro.png',
    'redpill.png',
    'bluepill.png',
    'bye.jpg',
    'bgmusic.mp3',
    'lin.mp4',
    'win.mp4'
];

// Create public directory if it doesn't exist
if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
}

// Copy each asset
assets.forEach(asset => {
    const sourcePath = path.join(__dirname, asset);
    const destPath = path.join(__dirname, 'public', asset);
    
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied ${asset} to public folder`);
    } else {
        console.log(`Warning: ${asset} not found`);
    }
});

console.log('Asset copy complete!');


