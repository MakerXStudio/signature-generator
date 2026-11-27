import fs from 'fs';
import path from 'path';

// Resolved from the working directory rather than import.meta.url so the same
// helper runs under CRA's CommonJS Jest and under Vitest.
const goldensDir = path.join(process.cwd(), 'src', '__goldens__');

// Compares `actual` byte for byte with src/__goldens__/<name>. With
// UPDATE_GOLDENS=1 the file is (re)written instead; a missing golden fails.
export const expectGolden = (expect, name, actual) => {
  const file = path.join(goldensDir, name);
  if (process.env.UPDATE_GOLDENS === '1') {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, actual);
    return;
  }
  if (!fs.existsSync(file)) {
    throw new Error(
      `Missing golden src/__goldens__/${name}; run with UPDATE_GOLDENS=1 to record it`
    );
  }
  expect(actual).toBe(fs.readFileSync(file, 'utf8'));
};
