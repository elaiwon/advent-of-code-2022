const readData = (file) => {
  return file
    .trim()
    .split('\n')
    .map(line => {
      const match = line.match(/^(\d+)-(\d+),(\d+)-(\d+)$/);
      return {
        a: {
          start: parseInt(match[1]),
          end: parseInt(match[2])
        },
        b: {
          start: parseInt(match[3]),
          end: parseInt(match[4])
        }
      }
    });
};

const contains = (a, b) => (a.start <= b.start) && (a.end >= b.end);

const overlaps = (a, b) => (a.end >= b.start) && (b.end >= a.start);

const puzzle_4a = (file) => {
  return readData(file)
    .map(l => contains(l.a, l.b) || contains(l.b, l.a) ? 1 : 0)
    .reduce((acc, item) => acc + item, 0);
};

const puzzle_4b = (file) => {
  return readData(file)
    .map(l => overlaps(l.a, l.b))
    .reduce((acc, item) => acc + item, 0);
};

export {
  puzzle_4a,
  puzzle_4b
};