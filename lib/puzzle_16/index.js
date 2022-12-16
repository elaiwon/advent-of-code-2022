const readData = (file) => {
  return file
    .trimEnd()
    .split('\n')
    .reduce((map, line) => {
      const match = line.match(/^Valve (.+) has flow rate=(\d+); tunnels* leads* to valves* (.*)$/);

      map[match[1]] = {
        flowRate: parseInt(match[2]),
        tunnels: match[3].split(', ')
      };

      return map;
    }, {});
};

const generateNodeMap = (data, start) => {
  return Object.keys(data)
    .reduce((acc, key) => {
      return acc.concat({
        pos: key,
        distance: key === start ? 0 : Number.MAX_SAFE_INTEGER,
        visited: false
      });
    }, []);
};

const explore = (data, nodeMap) => {
  let current;

  while(true) {
    current = nodeMap
      .filter(n => !n.visited)
      .sort((a, b) => a.distance - b.distance)[0];
      
    if (!current || (current.distance === Number.MAX_SAFE_INTEGER)) return;

    const unVisited = nodeMap
      .filter(n => {
        if (n.visited) return false;
        
        return (data[current.pos].tunnels.indexOf(n.pos) >= 0);
      });

    unVisited.forEach(n => {
      n.distance = Math.min(n.distance, current.distance + 1);
    });

    current.visited = true;
  }
};

const openValves = (data, start, remainingTime, totalFlow, valvesToOpen) => {
  if (remainingTime <= 0) return totalFlow;
  if (!valvesToOpen.length) return totalFlow;

  return valvesToOpen.reduce((total, valve, i) => {
    const time = remainingTime - data[start].distance[valve];
    const newValvesToOpen = [...valvesToOpen];
    newValvesToOpen.splice(i, 1);

    return Math.max(total, openValves(
      data,
      valve,
      time - 1,
      totalFlow + ((time - 1) * data[valve].flowRate),
      newValvesToOpen
    ));
  }, totalFlow);
};

const puzzle_16a = (file) => {
  const data = readData(file);

  Object.keys(data)
    .forEach(key => {
      const map = generateNodeMap(data, key);
      explore(data, map);
      data[key].distance = {};

      map.forEach(m => {
        if (m.pos === key) return;

        data[key].distance[m.pos] = m.distance;
      });
    });

  return openValves(data, 'AA', 30, 0, Object.keys(data).filter(v => data[v].flowRate));
};

const splitList = (list) => {
  const combinations = [];
  
  for (let i = 0; i < Math.pow(2, list.length - 1); i ++) {
    const listA = [];
    const listB = [];
    for (let b = 0; b < list.length; b++) {
      if (Math.floor(i / Math.pow(2, b)) % 2) {
        listA.push(list[b]);
      } else {
        listB.push(list[b]);
      }
    }
    
    combinations.push([listA, listB]);
  }

  return combinations;
};

const puzzle_16b = (file) => {
  const data = readData(file);

  Object.keys(data)
    .forEach(key => {
      const map = generateNodeMap(data, key);
      explore(data, map);
      data[key].distance = {};

      map.forEach(m => {
        if (m.pos === key) return;

        data[key].distance[m.pos] = m.distance;
      });
    });

  return splitList(Object.keys(data).filter(v => data[v].flowRate))
    .reduce((total, comb) => {
      return Math.max(
        total,
        openValves(data, 'AA', 26, 0, comb[0]) + openValves(data, 'AA', 26, 0, comb[1])
      );
    }, 0);
};

export {
  puzzle_16a,
  puzzle_16b
};