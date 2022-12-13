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

const exploreUp = (nodeMap) => {
  let current;

  do {
    current = nodeMap
      .filter(n => !n.visited)
      .sort((a, b) => a.distance - b.distance)[0];

    const unVisited = nodeMap
      .filter(n => {
        if (n.visited) return false;

        if (Math.abs(n.x - current.x) + Math.abs(n.y - current.y) !== 1) return false;

        if (n.height - current.height > 1) return false;

        return true;
      })
      unVisited.forEach(n => {
        n.distance = Math.min(n.distance, current.distance + 1);
      });

    current.visited = true;
  } while(current.code !== 'E');
};

const exploreDown = (nodeMap) => {
  let current;

  do {
    current = nodeMap
      .filter(n => !n.visited)
      .sort((a, b) => a.distance - b.distance)[0];

    const unVisited = nodeMap
      .filter(n => {
        if (n.visited) return false;

        if (Math.abs(n.x - current.x) + Math.abs(n.y - current.y) !== 1) return false;

        if (n.height - current.height < -1) return false;

        return true;
      })
      unVisited.forEach(n => {
        n.distance = Math.min(n.distance, current.distance + 1);
      });

    current.visited = true;
  } while(current.code !== 'E');
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

  exploreUp(nodeMap);
  
  return nodeMap
    .find(n => (n.x === end.x) && (n.y === end.y))
    .distance;
};

const puzzle_12b = (file) => {
  const map = readData(file);
  const start = findNode(map, 'S');
  const end = findNode(map, 'E');
  const nodeMap = generateNodeMap(map, start);

  return generateNodeMap(map, start)
    .filter(n => (n.code === 'S') || (n.code === 'a'))
    .map((n, i, arr) => {
      const nodeMap = generateNodeMap(map, n);
    
      exploreUp(nodeMap);
      
      return nodeMap
        .find(n => (n.x === end.x) && (n.y === end.y))
        .distance;
    })
    .sort((a, b) => a - b)[0];
};

export {
  puzzle_12a,
  puzzle_12b
};