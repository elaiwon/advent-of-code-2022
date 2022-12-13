const readData = (file) => {
  return file
    .trimEnd()
    .split('\n\n')
    .map(pair => pair.split('\n').map(l => JSON.parse(l)));
};

const correctOrder = (left, right) => {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left < right) {
      return 'inOrder';
    }

    if (left > right) {
      return 'notInOrder';
    }

    return 'equal';
  }

  if (Number.isInteger(left)) {
    
    left = [left];
  }

  if (Number.isInteger(right)) {
    
    right = [right];
  }

  const min = Math.min(left.length, right.length);

  for (let i = 0; i < min; i++) {
    const comparison = correctOrder(left[i], right[i]);
    if(comparison !== 'equal') return comparison;
  }

  if (left.length < right.length) {
    return 'inOrder';
  }

  if (left.length > right.length) {
    return 'notInOrder';
  }
  
  return 'equal';
};

const puzzle_13a = (file) => {
  return readData(file)
    .reduce((acc, [ left, right ], i) => {
      const order = correctOrder(left, right);
      return acc + (order === 'inOrder' ? i + 1 : 0);
    }, 0);
};

const puzzle_13b = (file) => {
  const DIVIDER1 = [[2]];
  const DIVIDER2 = [[6]];

  const sorted = readData(file)
    .reduce((acc, item) => acc.concat(item), [])
    .concat([DIVIDER1, DIVIDER2])
    .sort((left, right) => {
      const order = correctOrder(left, right);
      
      if(order === 'inOrder') return -1;
      if(order === 'notInOrder') return 1;

      return 0;
    });

    return (1 + sorted.indexOf(DIVIDER1)) * (1 + sorted.indexOf(DIVIDER2));
};

export {
  puzzle_13a,
  puzzle_13b
};