const fs = require('fs');
const path = require('path');

const targets = [
  'node_modules',
  'package-lock.json',
  'yarn.lock',
  'apps/web/node_modules',
  'apps/mobile/node_modules',
  'packages/shared/node_modules',
  'packages/shared/dist',
];

targets.forEach((target) => {
  const p = path.resolve(__dirname, '..', target);
  if (fs.existsSync(p)) {
    console.log(`Removing: ${p}`);
    try {
      fs.rmSync(p, { recursive: true, force: true });
    } catch (err) {
      console.error(`Failed to remove ${p}:`, err.message);
    }
  }
});
console.log('Cleanup completed successfully.');
