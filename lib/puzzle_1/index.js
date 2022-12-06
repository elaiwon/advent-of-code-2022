const readData = (file) => {
  const lines = file.trim().split('\n\n');
  const data = lines.map(l => l.split('\n'));

  return data.map(elf => elf.reduce((acc, item) => acc + parseInt(item), 0));
};

const puzzle_1a = (file) => {
  const elfCalories = readData(file);

  return Math.max(...elfCalories);
};

const puzzle_1b = (file) => {
  const sortedElfCalories = readData(file).sort((a, b) => b - a);

  return sortedElfCalories[0] + sortedElfCalories[1] + sortedElfCalories[2];
};

export {
  puzzle_1a,
  puzzle_1b
};