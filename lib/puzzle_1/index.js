const readCalories = (file) => {
  const lines = file.trim().split('\n\n');
  const data = lines.map(l => l.split('\n'));

  return data.map(elf => elf.reduce((acc, item) => acc + parseInt(item), 0));
};

const puzzle_1a = (file) => {
  const elfCalories = readCalories(file);

  return Math.max(...elfCalories);
};

const validate_1a = (answer) => {
  return answer === 24000;
};

const puzzle_1b = (file) => {
  const sortedElfCalories = readCalories(file).sort((a, b) => b - a);

  return sortedElfCalories[0] + sortedElfCalories[1] + sortedElfCalories[2];
};

const validate_1b = (answer) => {
  return answer === 45000;
};

export {
  puzzle_1a,
  puzzle_1b,
  validate_1a,
  validate_1b
};