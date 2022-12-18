const readData = (file) => {
  return file
    .trimEnd()
    .split('');
};

const ROCK_TYPES = [
  ['####'],
  ['.#.', '###', '.#.'],
  ['###', '..#', '..#'],
  ['#', '#', '#', '#'],
  ['##', '##']
]
  .map(block => block.map(row => row.split('')));

let currentRock = 0;
let currentJet = 0;

const merge = (map, rock, x, y) => {
  return rock.reduce((acc, row, i) => {
    if (map.length < rock.length + y) {
      map = map.concat(new Array(rock.length + y - map.length).fill(null).map(r => new Array(7).fill('.')));
    }

    for (let j = 0; j < 7; j++) {
      if ((j >= x) && (j < x + row.length)) map[y + i][j] = row[j - x] === "." ? map[y + i][j] : row[j - x];
    }

    return map;
  }, map);
};

const print = (map, count) => {
  console.log('-------', count);
  console.log([...map].reverse().map(row => row.join('')).join('\n'));
};

const applyJet = (map, rock, x, y, jets) => {
  const dir = jets[currentJet];
  currentJet = ((currentJet + 1) % jets.length);

  if (dir === '>') {
    if (x + rock[0].length > 6) return x;

    if (y >= map.length) return x + 1;

    for (let i = 0; (i < rock.length) && (i + y < map.length); i++) {
      for (let j = rock[0].length; j >= 0; j--) {
        if (rock[i][j] === '#') {
          if (map[i + y][j + x + 1] === '#') return x; else break;
        }
      }
    }

    return x + 1;
  } else {
    if (x < 1) return x;

    if (y >= map.length) return x - 1;

    for (let i = 0; (i < rock.length) && (i + y < map.length); i++) {
      for (let j = 0; j < rock[0].length; j++) {
        if (rock[i][j] === '#') {
          if (map[i + y][j + x - 1] === '#') return x; else break;
        }
      }
    }

    return x - 1;
  }
};

const applyGravity = (map, rock, x, y) => {
  if (y === 0) return y;

  for (let j = 0; j < rock[0].length; j++) {
    for (let i = 0; (i < rock.length) && (i + y - 1 < map.length); i++) {
      if (rock[i][j] === '#') {
        if (map[i + y - 1][j + x] === '#') return y; else break;
      }
    }
  }

  return y - 1;
};

const fallBlocks = (jets, iterations) => {
  let count = 0;
  let map = [];
  let time = 0;
  let template;
  let templateCount;
  let towerSize;
  let tryCount = false;
  let offset = 0;
  const period = ROCK_TYPES.length * jets.length;
  
  while (true) {
    const oldRock = currentRock;
    const rock = ROCK_TYPES[currentRock];
    currentRock = ((currentRock + 1) % ROCK_TYPES.length);
    let x = 2;
    let y = map.length + 3;
    let oldY;
    let section = 0;

    do {
      oldY = y;
      time++;
      section++;

      x = applyJet(map, rock, x, y, jets);
      y = applyGravity(map, rock, x, y);

      if (time % period === 0) {
        tryCount = true;
      }

      // print(merge(map.map(row => row.map(i => i)), rock.map(row => row.map(i => i === "#" ? "@" : '.')), x, y))
  
    } while (y !== oldY);
  
    map = merge(map, rock, x, y);

    if (tryCount) {
      const newTemplate = `${map.slice(-period).map(r => r.join('')).join('|')}+${currentRock}+${section}`;
      tryCount = false;

      if (newTemplate === template) {
        const cycles = Math.floor((iterations - count) / (count - templateCount));
        const missingIterations = (iterations - count) % (count - templateCount);
        const towerCycle = map.length - towerSize;

        count = iterations - missingIterations;
        offset = cycles * towerCycle;
      }

      template = newTemplate;
      templateCount = count;
      towerSize = map.length;
    }

    count++;

    if (count === iterations) return offset + map.length;
  }
};

const puzzle_17a = (file) => {
  const data = readData(file);

  return fallBlocks(data, 2022);
};

const puzzle_17b = (file) => {
  const data = readData(file);

  return fallBlocks(data, 1000000000000);
};

export {
  puzzle_17a,
  puzzle_17b
};