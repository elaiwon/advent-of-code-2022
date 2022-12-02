import fs from 'fs';
import { puzzle_1a, puzzle_1b, validate_1a, validate_1b } from './lib/puzzle_1/index.js';
import { puzzle_2a, puzzle_2b, validate_2a, validate_2b } from './lib/puzzle_2/index.js';

const puzzles = {
  "1a": puzzle_1a,
  "1b": puzzle_1b,
  "2a": puzzle_2a,
  "2b": puzzle_2b
};

const validate = {
  "1a": validate_1a,
  "1b": validate_1b,
  "2a": validate_2a,
  "2b": validate_2b
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
