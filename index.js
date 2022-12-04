import fs from 'fs';
import { puzzle_1a, puzzle_1b, validate_1a, validate_1b } from './lib/puzzle_1/index.js';
import { puzzle_2a, puzzle_2b, validate_2a, validate_2b } from './lib/puzzle_2/index.js';
import { puzzle_3a, puzzle_3b, validate_3a, validate_3b } from './lib/puzzle_3/index.js';
import { puzzle_4a, puzzle_4b, validate_4a, validate_4b } from './lib/puzzle_4/index.js';
import { puzzle_5a, puzzle_5b, validate_5a, validate_5b } from './lib/puzzle_5/index.js';
import { puzzle_6a, puzzle_6b, validate_6a, validate_6b } from './lib/puzzle_6/index.js';
import { puzzle_7a, puzzle_7b, validate_7a, validate_7b } from './lib/puzzle_7/index.js';
import { puzzle_8a, puzzle_8b, validate_8a, validate_8b } from './lib/puzzle_8/index.js';
import { puzzle_9a, puzzle_9b, validate_9a, validate_9b } from './lib/puzzle_9/index.js';
import { puzzle_10a, puzzle_10b, validate_10a, validate_10b } from './lib/puzzle_10/index.js';
import { puzzle_11a, puzzle_11b, validate_11a, validate_11b } from './lib/puzzle_11/index.js';
import { puzzle_12a, puzzle_12b, validate_12a, validate_12b } from './lib/puzzle_12/index.js';
import { puzzle_13a, puzzle_13b, validate_13a, validate_13b } from './lib/puzzle_13/index.js';
import { puzzle_14a, puzzle_14b, validate_14a, validate_14b } from './lib/puzzle_14/index.js';
import { puzzle_15a, puzzle_15b, validate_15a, validate_15b } from './lib/puzzle_15/index.js';
import { puzzle_16a, puzzle_16b, validate_16a, validate_16b } from './lib/puzzle_16/index.js';
import { puzzle_17a, puzzle_17b, validate_17a, validate_17b } from './lib/puzzle_17/index.js';
import { puzzle_18a, puzzle_18b, validate_18a, validate_18b } from './lib/puzzle_18/index.js';
import { puzzle_19a, puzzle_19b, validate_19a, validate_19b } from './lib/puzzle_19/index.js';
import { puzzle_20a, puzzle_20b, validate_20a, validate_20b } from './lib/puzzle_20/index.js';
import { puzzle_21a, puzzle_21b, validate_21a, validate_21b } from './lib/puzzle_21/index.js';
import { puzzle_22a, puzzle_22b, validate_22a, validate_22b } from './lib/puzzle_22/index.js';
import { puzzle_23a, puzzle_23b, validate_23a, validate_23b } from './lib/puzzle_23/index.js';
import { puzzle_24a, puzzle_24b, validate_24a, validate_24b } from './lib/puzzle_24/index.js';
import { puzzle_25a, puzzle_25b, validate_25a, validate_25b } from './lib/puzzle_25/index.js';

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

const validate = {
  "1a": validate_1a, "1b": validate_1b,
  "2a": validate_2a, "2b": validate_2b,
  "3a": validate_3a, "3b": validate_3b,
  "4a": validate_4a, "4b": validate_4b,
  "5a": validate_5a, "5b": validate_5b,
  "6a": validate_6a, "6b": validate_6b,
  "7a": validate_7a, "7b": validate_7b,
  "8a": validate_8a, "8b": validate_8b,
  "9a": validate_9a, "9b": validate_9b,
  "10a": validate_10a, "10b": validate_10b,
  "11a": validate_11a, "11b": validate_11b,
  "12a": validate_12a, "12b": validate_12b,
  "13a": validate_13a, "13b": validate_13b,
  "14a": validate_14a, "14b": validate_14b,
  "15a": validate_15a, "15b": validate_15b,
  "16a": validate_16a, "16b": validate_16b,
  "17a": validate_17a, "17b": validate_17b,
  "18a": validate_18a, "18b": validate_18b,
  "19a": validate_19a, "19b": validate_19b,
  "20a": validate_20a, "20b": validate_20b,
  "21a": validate_21a, "21b": validate_21b,
  "22a": validate_22a, "22b": validate_22b,
  "23a": validate_23a, "23b": validate_23b,
  "24a": validate_24a, "24b": validate_24b,
  "25a": validate_25a, "25b": validate_25b
};

const puzzleName= process.argv[2];
const index = parseInt(puzzleName);
const dataName = process.argv[3] === 'test' ? 'test' : 'final';
const filename = `./data/puzzle_${index}/${dataName}.txt`;

const file = fs.readFileSync(filename, 'ascii');

const answer = puzzles[puzzleName](file);

if (dataName === 'test') {
  const valid = validate[puzzleName](answer);

  console.log(`Answer for puzzle ${puzzleName}: ${answer} (${valid ? 'Correct' : 'Wrong'})`);
} else {
  console.log(`Answer for puzzle ${puzzleName}: ${answer}`);
}
