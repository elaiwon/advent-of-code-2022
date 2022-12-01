const readCalories = (file) => {
  const lines = file.trim().split('\n\n');
  const data = lines.map(l => l.split('\n'));

  return data.map(elf => elf.reduce((acc, item) => acc + parseInt(item), 0));
};

const puzzle_1a = (file) => {
  const elfCalories = readCalories(file);

  const result = Math.max(...elfCalories);

  console.log(`Max calories: ${result}`);
};

const puzzle_1b = () => {
  const sortedElfCalories = readCalories().sort((a, b) => b - a);

  const result = sortedElfCalories[0] + sortedElfCalories[1] + sortedElfCalories[2];

  console.log(`Calories: ${result}`);
};

export {
  puzzle_1a,
  puzzle_1b
};