const readData = (file) => {
  return file
    .trimEnd()
    .split('\n')
    .map(line => {
      const match = line.match(/^(noop|addx)\s*(.*)$/);
      
      return {
        ...{ command: match[1] },
        ... match[2] && { value: parseInt(match[2]) }
      };
    });
};

const history = [ 1 ];

const process = (line) => {
  const X = history[history.length - 1];

  switch (line.command) {
    case 'noop':
      history.push(X);
      return X;
    case 'addx':
      history.push(X);
      history.push(X + line.value);
      return X + line.value;
  }
};

const CYCLES = [20, 60, 100, 140, 180, 220];

const puzzle_10a = (file) => {
  readData(file)
    .forEach((line) => process(line));

  return CYCLES.reduce((acc, i) => acc + (i * history[i - 1]), 0);
};

const drawCRT = () => {
  const crt = new Array(6).fill(null).map(r => new Array(40).fill('.'));

  for (let c = 0; c < 6 * 40; c++) {
    const x = Math.floor(c / 40);
    const y = c % 40;
    const X = history[c];

    if ((y >= X - 1) && (y <= X + 1)) crt[x][y] = '#';
  }

  return crt.map(r => r.join('')).join('\n');
};

const puzzle_10b = (file) => {
  readData(file)
    .forEach((line) => process(line));

  return drawCRT();
};

export {
  puzzle_10a,
  puzzle_10b
};