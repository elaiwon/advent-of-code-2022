const readData = (file) => {
  return file
    .trim()
    .split('\n')
    .map(line => {
      const items = line.split('');

      return {
        a: items.slice(0, items.length / 2),
        b: items.slice(items.length / 2, items.length)
      };
    });
};

const findRepeated = (data) => {
  for (let i = 0; i < data.a.length; i++) {
    for (let j = 0; j < data.b.length; j++) {
      if (data.a[i] === data.b[j]) return data.a[i];
    }
  }
};

const PRIORITIES = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const getPriority = (char) => PRIORITIES.indexOf(char) + 1;

const puzzle_3a = (file) => {
  return readData(file)
    .map(r => findRepeated(r))
    .map(r => getPriority(r))
    .reduce((acc, i) => acc + i, 0);
};

const findBadge = (group) => {
  for (let i = 0; i < PRIORITIES.length; i++) {
    const p = PRIORITIES[i];
    
    const in0 = (group[0].a.indexOf(p) >= 0) || (group[0].b.indexOf(p) >= 0);
    const in1 = (group[1].a.indexOf(p) >= 0) || (group[1].b.indexOf(p) >= 0);
    const in2 = (group[2].a.indexOf(p) >= 0) || (group[2].b.indexOf(p) >= 0);

    if (in0 && in1 && in2) return p;
  }
};

const puzzle_3b = (file) => {
  const data = readData(file);
  
  let groups = [];
  for (let i = 0; i < data.length; i = i + 3) {
    groups.push([
      data[i],
      data[i + 1],
      data[i + 2]
    ]);
  }

  return groups
    .map(g => findBadge(g))
    .map(r => getPriority(r))
    .reduce((acc, i) => acc + i, 0);
};

export {
  puzzle_3a,
  puzzle_3b
};