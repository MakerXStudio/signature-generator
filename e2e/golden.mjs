import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const goldensDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '__goldens__'
);

export const expectGolden = (expect, name, actual) => {
  const file = path.join(goldensDir, name);
  if (process.env.UPDATE_GOLDENS === '1') {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, actual);
    return;
  }
  if (!fs.existsSync(file)) {
    throw new Error(
      `Missing golden e2e/__goldens__/${name}; run with UPDATE_GOLDENS=1 to record it`
    );
  }
  expect(actual).toBe(fs.readFileSync(file, 'utf8'));
};
