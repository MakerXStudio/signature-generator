import fs from 'fs';
import path from 'path';

// Relative to the working directory, so tests must run from the repo root.
const goldensDir = path.join(process.cwd(), 'src', '__goldens__');

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
