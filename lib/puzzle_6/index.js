const readData = (file) => {
  return file
    .trim()
    .split('');
};

const findMarker = (data, len) => {
  for (let i = len - 1; i < data.length; i++) {
    let equal = false;

    for (let j = i - len + 1; j <= i; j++) {
      for (let k = j + 1; k<= i; k++) {
        equal = equal || (data[j] === data[k]);
      }
    }

    if (!equal) return i + 1;
  }
};

const puzzle_6a = (file) => {
  const data = readData(file);

  return findMarker(data, 4);
};

const validate_6a = (answer) => {
  return answer === 5;
};

const puzzle_6b = (file) => {
  const data = readData(file);

  return findMarker(data, 14);
};

const validate_6b = (answer) => {
  return answer === 6;
};

export {
  puzzle_6a,
  puzzle_6b,
  validate_6a,
  validate_6b
};