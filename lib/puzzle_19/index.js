const readData = (file) => {
  return file
    .trimEnd()
    .split('\n')
    .map(row => {
      const match = row.match(/Blueprint (\d+):\s+Each ore robot costs (\d+) ore.\s+Each clay robot costs (\d+) ore.\s+Each obsidian robot costs (\d+) ore and (\d+) clay.\s+Each geode robot costs (\d+) ore and (\d+) obsidian./);

      return {
        id: parseInt(match[1]),
        ore: {
          ore: parseInt(match[2])
        },
        clay: {
          ore: parseInt(match[3])
        },
        obsidian: {
          ore: parseInt(match[4]),
          clay: parseInt(match[5])
        },
        geode: {
          ore: parseInt(match[6]),
          obsidian: parseInt(match[7])
        }
      };
    });
};

let ITERATIONS;

const explore = (nodeMap, blueprint) => {
  const solution = [];
  let maxGeodes = 0;

  const maxConsumption = Object.keys(blueprint)
    .filter(k => k !== 'id')
    .reduce((max, robot) => Object.keys(blueprint[robot]).reduce((max, cost) => {
      max[cost] = Math.max(max[cost], blueprint[robot][cost]);

      return max;
    }, max), { ore: 0, clay: 0, obsidian: 0 });

  while (true) {
    let toProcess = [];

    if (nodeMap.length === 0) return solution;

    nodeMap.forEach(current => {
      let final = false;
  
      Object.keys(current.robots)
        .forEach(robot => {
          if (current.robots[robot] >= maxConsumption[robot]) return;

          let buildTime = 1 + Object.keys(blueprint[robot])
            .reduce((n, cost) => {
              return Math.ceil(Math.max(0, n, (blueprint[robot][cost] - current.goods[cost]) / current.robots[cost]));
            }, Number.MIN_SAFE_INTEGER);
  
          if (!Number.isFinite(buildTime)) return;
  
          const item = {
            iteration: current.iteration + buildTime,
            type: robot,
            robots: { ... current.robots },
            goods: { ...current.goods }
          };
  
          if (item.iteration >= ITERATIONS) {
            if (final) return;

            final = true;

            buildTime += ITERATIONS - item.iteration;
            item.iteration = ITERATIONS;
  
            Object.keys(current.goods)
              .reduce((item, name) => {
                item.goods[name] += current.robots[name] * buildTime;
    
                return item;
              }, item);

            if (item.goods.geode === 0) return;
            
            maxGeodes = Math.max(maxGeodes, item.goods.geode);

            solution.push(item);
          } else {
            item.potencial = item.goods.geode
              + ((2 * item.robots.geode) + ITERATIONS - item.iteration) * ((ITERATIONS - item.iteration + 1) / 2);

            if (item.potencial < maxGeodes) return;

            item.robots[robot]++;
  
            Object.keys(blueprint[robot])
              .reduce((item, name) => {
                item.goods[name] -= blueprint[robot][name];
  
                return item;
              }, item);
  
            Object.keys(current.goods)
              .reduce((item, name) => {
                item.goods[name] += current.robots[name] * buildTime;
    
                return item;
              }, item);
            
            toProcess.push(item);
          }
        }, []);
    });

    nodeMap = toProcess.filter(n => n.potencial >= maxGeodes);
  }
};

const puzzle_19a = (file) => {
  const blueprintList = readData(file);

  ITERATIONS = 24;

  return blueprintList.reduce((quality, blueprint) => {
    console.log(`Processing blueprint ${blueprint.id}`);

    const nodemap = [{
      iteration: 1,
      type: null,
      robots: {
        ore: 1,
        clay: 0,
        obsidian: 0,
        geode: 0
      },
      goods: {
        ore: 1,
        clay: 0,
        obsidian: 0,
        geode: 0
      }
    }];

    const result = explore(nodemap, blueprint);
    let max = 0;
    const best = result.reduce((best, i) => {
      if (i.goods.geode > max) {
        max = i.goods.geode;
        return i;
      }

      return best;
    }, null);

    return quality + (blueprint.id * max);
  }, 0);
};

const puzzle_19b = (file) => {
  const blueprintList = readData(file);

  ITERATIONS = 32;

  return blueprintList.slice(0, 3).reduce((quality, blueprint) => {
    console.log(`Processing blueprint ${blueprint.id}`);

    const nodemap = [{
      iteration: 1,
      type: null,
      robots: {
        ore: 1,
        clay: 0,
        obsidian: 0,
        geode: 0
      },
      goods: {
        ore: 1,
        clay: 0,
        obsidian: 0,
        geode: 0
      }
    }];

    const result = explore(nodemap, blueprint);
    let max = 0;
    const best = result.reduce((best, i) => {
      if (i.goods.geode > max) {
        max = i.goods.geode;
        return i;
      }

      return best;
    }, null);

    return quality * max;
  }, 1);
};

export {
  puzzle_19a,
  puzzle_19b
};