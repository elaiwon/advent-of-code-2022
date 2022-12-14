const readData = (file) => {
  return file
    .trimEnd()
    .split('\n')
    .map(row => {
      return row
        .split(/\s+->\s+/)
        .map(coord => coord.split(','))
        .map(coord => ({ x: parseInt(coord[0]), y: parseInt(coord[1]) }));
    });
};

const getMaxDepth = (data) => data.reduce((max, line) => Math.max(max, line.y), 0);

const getMap = (data) => {
  const map = [];

  data.forEach(line => {
    for (let i = 0; i < line.length; i++) {
      if (i === line.length - 1) {
        map.push(line[i]);
      } else {
        if (line[i].x === line[i + 1].x) {
          if (line[i].y < line[i + 1].y) {
            for (let y = line[i].y; y < line[i + 1].y; y++) {
              map.push({ x: line[i].x, y });
            }
          } else {
            for (let y = line[i].y; y > line[i + 1].y; y--) {
              map.push({ x: line[i].x, y });
            }
          }
        } else {
          if (line[i].x < line[i + 1].x) {
            for (let x = line[i].x; x < line[i + 1].x; x++) {
              map.push({ x, y: line[i].y });
            }
          } else {
            for (let x = line[i].x; x > line[i + 1].x; x--) {
              map.push({ x, y: line[i].y });
            }
          }
        }
      }
    }
  });

  return map;
};

const SOURCE = { x: 500, y : 0 };

const moveSand = (sand, map, maxDepth) => {
  if (!map.find(coord => (coord.x === sand.x) && (coord.y === sand.y + 1))) {
    sand.y++;
    return sand.y === maxDepth;
  }

  if (!map.find(coord => (coord.x === sand.x - 1) && (coord.y === sand.y + 1))) {
    sand.y++;
    sand.x--;
    return sand.y === maxDepth;
  }

  if (!map.find(coord => (coord.x === sand.x + 1) && (coord.y === sand.y + 1))) {
    sand.y++;
    sand.x++;
    return sand.y === maxDepth;
  }

  return true;
};

const puzzle_14a = (file) => {
  const data = readData(file);
  const map = getMap(data);

  const maxDepth = getMaxDepth(map);

  let count = 0;
  while(true) {
    const sand = {...SOURCE};
    
    do {} while (!moveSand(sand, map, maxDepth));

    if (sand.y === maxDepth) return count;

    map.push(sand);
    count ++;
  }
};

const puzzle_14b = (file) => {
  const data = readData(file);
  const map = getMap(data);

  const maxDepth = getMaxDepth(map);

  let count = 1;
  while(true) {
    const sand = {...SOURCE};
    
    do {} while (!moveSand(sand, map, maxDepth + 1));

    if ((sand.y === SOURCE.y)) return count;

    map.push(sand);
    count ++;
  }
};

export {
  puzzle_14a,
  puzzle_14b
};