import fs from 'fs';
import { puzzle_1a, puzzle_1b } from './lib/puzzle_1/index.js';
import { puzzle_2a, puzzle_2b } from './lib/puzzle_2/index.js';
import { puzzle_3a, puzzle_3b } from './lib/puzzle_3/index.js';
import { puzzle_4a, puzzle_4b } from './lib/puzzle_4/index.js';
import { puzzle_5a, puzzle_5b } from './lib/puzzle_5/index.js';
import { puzzle_6a, puzzle_6b } from './lib/puzzle_6/index.js';
import { puzzle_7a, puzzle_7b } from './lib/puzzle_7/index.js';
import { puzzle_8a, puzzle_8b } from './lib/puzzle_8/index.js';
import { puzzle_9a, puzzle_9b } from './lib/puzzle_9/index.js';
import { puzzle_10a, puzzle_10b } from './lib/puzzle_10/index.js';
import { puzzle_11a, puzzle_11b } from './lib/puzzle_11/index.js';
import { puzzle_12a, puzzle_12b } from './lib/puzzle_12/index.js';
import { puzzle_13a, puzzle_13b } from './lib/puzzle_13/index.js';
import { puzzle_14a, puzzle_14b } from './lib/puzzle_14/index.js';
import { puzzle_15a, puzzle_15b } from './lib/puzzle_15/index.js';
import { puzzle_16a, puzzle_16b } from './lib/puzzle_16/index.js';
import { puzzle_17a, puzzle_17b } from './lib/puzzle_17/index.js';
import { puzzle_18a, puzzle_18b } from './lib/puzzle_18/index.js';
import { puzzle_19a, puzzle_19b } from './lib/puzzle_19/index.js';
import { puzzle_20a, puzzle_20b } from './lib/puzzle_20/index.js';
import { puzzle_21a, puzzle_21b } from './lib/puzzle_21/index.js';
import { puzzle_22a, puzzle_22b } from './lib/puzzle_22/index.js';
import { puzzle_23a, puzzle_23b } from './lib/puzzle_23/index.js';
import { puzzle_24a, puzzle_24b } from './lib/puzzle_24/index.js';
import { puzzle_25a, puzzle_25b } from './lib/puzzle_25/index.js';

const puzzles = {
  "1a": puzzle_1a, "1b": puzzle_1b,
  "2a": puzzle_2a, "2b": puzzle_2b,
  "3a": puzzle_3a, "3b": puzzle_3b,
  "4a": puzzle_4a, "4b": puzzle_4b,
  "5a": puzzle_5a, "5b": puzzle_5b,
  "6a": puzzle_6a, "6b": puzzle_6b,
  "7a": puzzle_7a, "7b": puzzle_7b,
  "8a": puzzle_8a, "8b": puzzle_8b,
  "9a": puzzle_9a, "9b": puzzle_9b,
  "10a": puzzle_10a, "10b": puzzle_10b,
  "11a": puzzle_11a, "11b": puzzle_11b,
  "12a": puzzle_12a, "12b": puzzle_12b,
  "13a": puzzle_13a, "13b": puzzle_13b,
  "14a": puzzle_14a, "14b": puzzle_14b,
  "15a": puzzle_15a, "15b": puzzle_15b,
  "16a": puzzle_16a, "16b": puzzle_16b,
  "17a": puzzle_17a, "17b": puzzle_17b,
  "18a": puzzle_18a, "18b": puzzle_18b,
  "19a": puzzle_19a, "19b": puzzle_19b,
  "20a": puzzle_20a, "20b": puzzle_20b,
  "21a": puzzle_21a, "21b": puzzle_21b,
  "22a": puzzle_22a, "22b": puzzle_22b,
  "23a": puzzle_23a, "23b": puzzle_23b,
  "24a": puzzle_24a, "24b": puzzle_24b,
  "25a": puzzle_25a, "25b": puzzle_25b
};

const puzzleName= process.argv[2];
const index = parseInt(puzzleName);
const dataName = process.argv[3] === 'test' ? 'test' : 'final';
const filename = `./data/puzzle_${index}/${dataName}.txt`;

const file = fs.readFileSync(filename, 'ascii');

if (dataName === 'test') {
  const tests = file.split('------');
  tests. forEach((t, i) => {
    const [resultA, resultB, data] = t.split('|');
    const result = /a/.test(puzzleName) ? resultA : resultB;
    const [expected, input] = (result && result.split(',')) || [null, null];  

    if (result !== undefined) {
      const answer = puzzles[puzzleName](data, input);
  
      console.log(`Answer for puzzle ${puzzleName} (${i}): ${answer} (${answer === JSON.parse(expected) ? '\x1B[32mCorrect\x1B[m' : '\x1B[31mWrong\x1B[m'})`);
    }
  });
} else {
  const answer = puzzles[puzzleName](file);

  console.log(`Answer for puzzle ${puzzleName}\n`);
  console.log(answer);
}
