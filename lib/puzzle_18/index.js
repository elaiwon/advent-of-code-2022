const readData = (file) => {
  return file
    .trimEnd()
    .split('\n')
    .map(l => l.split(',').map(i => parseInt(i)))
    .map(l => ({ x: l[0], y: l[1], z: l[2] }));
};

const findCube = (allCubes, cube) => allCubes.find(c => (cube.x === c.x) && (cube.y === c.y) && (cube.z === c.z));

const puzzle_18a = (file) => {
  return readData(file)
    .reduce((area, cube, i, allCubes) => {
      return area + [
        { dx: 1, dy: 0, dz: 0 },
        { dx: -1, dy: 0, dz: 0 },
        { dx: 0, dy: 1, dz: 0 },
        { dx: 0, dy: -1, dz: 0 },
        { dx: 0, dy: 0, dz: 1 },
        { dx: 0, dy: 0, dz: -1 }
      ].reduce((cubeArea, dir) => {
          return cubeArea + (findCube(allCubes, { x: cube.x + dir.dx, y: cube.y + dir.dy, z: cube.z + dir.dz }) ? 0 : 1);
        }, 0);
    }, 0);
};

const explore = (nodeMap) => {
  let current;

  while(true) {
    current = nodeMap
      .filter(n => !n.visited)
      .sort((a, b) => a.distance - b.distance)[0];
      
    if (!current || (current.distance === Number.MAX_SAFE_INTEGER)) return;

    const unVisited = nodeMap
      .filter(n => {
        if (n.visited) return false;

        if (Math.abs(n.x - current.x) + Math.abs(n.y - current.y) + Math.abs(n.z - current.z) !== 1) return false;

        return true;
      });

    unVisited.forEach(n => {
      n.distance = Math.min(n.distance, current.distance + 1);
    });

    current.visited = true;
  }
};

const puzzle_18b = (file) => {
  const data = readData(file);

  const coords = data.reduce((acc, item) => {
    return {
      minX: Math.min(acc.minX, item.x),
      minY: Math.min(acc.minX, item.y),
      minZ: Math.min(acc.minX, item.z),
      maxX: Math.max(acc.maxX, item.x),
      maxY: Math.max(acc.maxY, item.y),
      maxZ: Math.max(acc.maxZ, item.z)
    };
  }, {
    minX: Number.MAX_SAFE_INTEGER,
    minY: Number.MAX_SAFE_INTEGER,
    minZ: Number.MAX_SAFE_INTEGER,
    maxX: Number.MIN_SAFE_INTEGER,
    maxY: Number.MIN_SAFE_INTEGER,
    maxZ: Number.MIN_SAFE_INTEGER
  });

  const airCube = [];
  for (let x = coords.minX - 1; x <= coords.maxX + 1; x++) {
    for (let y = coords.minY - 1; y <= coords.maxY + 1; y++) {
      for (let z = coords.minZ - 1; z <= coords.maxZ + 1; z++) {
        if (!findCube(data, { x, y, z })) {
          airCube.push({
            x,
            y,
            z,
            distance: Number.MAX_SAFE_INTEGER,
            visited: false
          });
        }
      }
    }
  }
  airCube[0].distance = 0;

  explore(airCube);

  return airCube
    .filter(c => c.visited)
    .reduce((area, cube, i, allCubes) => {
      return area + [
        { dx: 1, dy: 0, dz: 0 },
        { dx: -1, dy: 0, dz: 0 },
        { dx: 0, dy: 1, dz: 0 },
        { dx: 0, dy: -1, dz: 0 },
        { dx: 0, dy: 0, dz: 1 },
        { dx: 0, dy: 0, dz: -1 }
      ].reduce((cubeArea, dir) => {
        const newCube = { x: cube.x + dir.dx, y: cube.y + dir.dy, z: cube.z + dir.dz };

        if ((newCube.x < coords.minX) || (newCube.y < coords.minY) || (newCube.z < coords.minZ)
          || (newCube.x > coords.maxX) || (newCube.y > coords.maxY) || (newCube.z > coords.maxZ)) {
          return cubeArea;
        }

        return cubeArea + (findCube(allCubes, newCube) ? 0 : 1);
      }, 0);
    }, 0);
};

export {
  puzzle_18a,
  puzzle_18b
};