const readData = (file) => {
  return file
    .trimEnd()
    .split('\n')
    .map((l, i) => ({ value: parseInt(l), pos: i }));
};

const getNewIndex = (item, index, length) => {
  let newIndex;

  newIndex = item + index;

  if (item > 0) {
    return newIndex % (length - 1);
  }

  if (item < 0) {
    if (newIndex < 0) newIndex += (length - 1) * Math.floor(-newIndex / (length - 1));
    return newIndex % (length - 1);
  }

  return newIndex;
};

const mix = (data) => {
  for (let i = 0; i < data.length; i++) {
    const index = data.findIndex(d => d.pos === i);
    const item = data[index];
    const newIndex = getNewIndex(item.value, index, data.length);

    data.splice(newIndex, 0, ...data.splice(index, 1));
  }
};

const puzzle_20a = (file) => {
  const data = readData(file);

  mix(data);

  const index = data.findIndex(d=> d.value === 0);

  return [1000, 2000, 3000]
    .reduce((sum, i) => sum + data[(index + i) % data.length].value, 0);
};

const puzzle_20b = (file) => {
  const DECRYPTION_KEY = 811589153;

  const data = readData(file)
    .map(d => {
      d.value *= DECRYPTION_KEY;

      return d;
    });

  for (let i = 0; i < 10; i++) {
    mix(data);
  }

  const index = data.findIndex(d=> d.value === 0);

  return [1000, 2000, 3000]
    .reduce((sum, i) => sum + data[(index + i) % data.length].value, 0);
};

export {
  puzzle_20a,
  puzzle_20b
};