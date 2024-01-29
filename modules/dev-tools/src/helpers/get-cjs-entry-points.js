import fs from 'fs';
import {basename} from 'path';

export function getCJSEntryPoints() {
  const packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  if (packageInfo.exports) {
    const result = [];
    for (const key in packageInfo.exports) {
      const cjsEntry = packageInfo.exports[key].require;
      if (cjsEntry) {
        const fileName = basename(cjsEntry.default || cjsEntry, '.cjs');
        result.push(fileName);
      }
    }
    return result;
  }

  // Default entry
  return ['index'];
}
