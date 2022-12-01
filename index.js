import fs from 'fs';
import { puzzle_1a, puzzle_1b } from './lib/puzzle_1/index.js';

const puzzles = {
  "1a": puzzle_1a,
  "1b": puzzle_1b
};

const puzzleName= process.argv[2];
const index = parseInt(puzzleName);
const dataName = process.argv[3] === 'test' ? 'test' : 'final';

const file = fs.readFileSync(`./data/puzzle_${index}/${dataName}.txt`, 'ascii');

puzzles[puzzleName](file);
