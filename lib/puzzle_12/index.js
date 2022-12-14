const HEIGHTS = 'abcdefghijklmnopqrstuvwxyz';
let START, END;

const readData = (file) => {
  return file
    .trimEnd()
    .split('\n')
    .map(row => row.split(''));
};

const findNode = (map, node) => {
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      if (map[x][y] === node) return { x, y };
    }
  }
};

const getHeight = (code) => {
  if (code === 'S') return HEIGHTS.indexOf('a');

  if (code === 'E') return HEIGHTS.indexOf('z');

  return HEIGHTS.indexOf(code);
};

const explore = (nodeMap, direction = 'up') => {
  let current;

  while(true) {
    current = nodeMap
      .filter(n => !n.visited)
      .sort((a, b) => a.distance - b.distance)[0];
      
    if (!current || (current.distance === Number.MAX_SAFE_INTEGER)) return;

    const unVisited = nodeMap
      .filter(n => {
        if (n.visited) return false;

        if (Math.abs(n.x - current.x) + Math.abs(n.y - current.y) !== 1) return false;

        if (direction === 'up') {
          if (n.height - current.height > 1) return false;
        } else {
          if (n.height - current.height < -1) return false;
        }

        return true;
      });

    unVisited.forEach(n => {
      n.distance = Math.min(n.distance, current.distance + 1);
    });

    current.visited = true;
  }
};

const generateNodeMap = (map, start) => {
  return map.reduce((acc, row, x) => {
    return acc.concat(row.reduce((acc2, item, y) => {
      return acc2.concat([{
        x,
        y,
        code: item,
        height: getHeight(item),
        visited: false,
        distance: (x === start.x) && (y === start.y) ? 0 : Number.MAX_SAFE_INTEGER
      }]);
    }, []));
  }, []);
};

const puzzle_12a = (file) => {
  const map = readData(file);
  const start = findNode(map, 'S');
  const end = findNode(map, 'E');
  const nodeMap = generateNodeMap(map, start);

  explore(nodeMap);
  
  return nodeMap
    .find(n => (n.x === end.x) && (n.y === end.y))
    .distance;
};

const puzzle_12b = (file) => {
  const map = readData(file);
  const start = findNode(map, 'E');
  const nodeMap = generateNodeMap(map, start);

  explore(nodeMap, 'down');
  
  return nodeMap
    .filter(n => (n.code === 'S') || (n.code === 'a'))
    .reduce((min, n) => Math.min(min, n.distance), Number.MAX_SAFE_INTEGER);
};

export {
  puzzle_12a,
  puzzle_12b
};