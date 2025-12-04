#!/usr/bin/env node

/**
 * Script to download Reloam screenshots from GitHub repository
 * Usage: node scripts/download-reloam-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const REPO_OWNER = 'alfa2267';
const REPO_NAME = 'reloam-landing';
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'assets', 'images', 'reloam');

// List of images to download
const IMAGES = [
  'login-landlord.png',
  'dashboard.png',
  'tenant-management.png',
  'financial-tracking.png',
  'activity-log.png',
  'reports.png'
];

// Create directory if it doesn't exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log(`Created directory: ${IMAGES_DIR}`);
}

/**
 * Download a file from a URL
 */
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        return downloadFile(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

/**
 * Try to get image from GitHub raw content
 */
async function downloadFromGitHub(filename) {
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/screenshots/${filename}`;
  const filepath = path.join(IMAGES_DIR, filename);
  
  try {
    await downloadFile(url, filepath);
    return true;
  } catch (error) {
    console.log(`✗ Failed to download ${filename} from GitHub: ${error.message}`);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Downloading Reloam screenshots...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const image of IMAGES) {
    const success = await downloadFromGitHub(image);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log(`\nDownload complete: ${successCount} succeeded, ${failCount} failed`);
  
  if (failCount > 0) {
    console.log('\nNote: If images failed to download, the repository might be private.');
    console.log('You can manually add images to:', IMAGES_DIR);
    console.log('Or update the image URLs in src/views/projects/reloam/ReloamPage.js');
  }
}

main().catch(console.error);

