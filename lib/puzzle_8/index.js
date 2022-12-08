const readData = (file) => {
  return file
    .trimEnd()
    .split('\n')
    .map(line => line.split(''))
};

const visibleFromTop = (data, i, j) => {
  let visible = true;
  for (let n = 0; n < i; n++) {
    visible = visible && (data[n][j] < data[i][j]);
  }

  return visible;
};

const visibleFromBottom = (data, i, j) => {
  let visible = true;
  for (let n = i + 1; n < data.length; n++) {
    visible = visible && (data[n][j] < data[i][j]);
  }

  return visible;
};

const visibleFromLeft = (data, i, j) => {
  let visible = true;
  for (let n = 0; n < j; n++) {
    visible = visible && (data[i][n] < data[i][j]);
  }

  return visible;
};

const visibleFromRight = (data, i, j) => {
  let visible = true;
  for (let n = j + 1; n < data.length; n++) {
    visible = visible && (data[i][n] < data[i][j]);
  }

  return visible;
};

const buildVisibilityMap = (data) => {
  return data.map((line, i) => line.map((row, j) => {
    return {
      fromTop: visibleFromTop(data, i, j),
      fromBottom: visibleFromBottom(data, i, j),
      fromLeft: visibleFromLeft(data, i, j),
      fromRight: visibleFromRight(data, i, j),
    };
  }));
};

const puzzle_8a = (file) => {
  const data = readData(file);
  const visibilityMap = buildVisibilityMap(data);

  return visibilityMap.reduce((acc, row) => acc + row
    .reduce((acc2, item) => acc2 + (Object
      .keys(item)
      .reduce((acc3, key) => acc3 || item[key], false) ? 1 : 0), 0), 0);
};

const visbilityDistanceFromLeft = (data, i, j) => {
  let distance = 0;
  let n = j - 1;
  while (n >= 0) {
    distance++;
    if (data[i][n] >= data[i][j]) return distance;
    n--;
  }

  return distance;
};

const visbilityDistanceFromRight = (data, i, j) => {
  let distance = 0;
  let n = j + 1;
  while (n < data.length) {
    distance++;
    if (data[i][n] >= data[i][j]) return distance;
    n++;
  }

  return distance;
};

const visbilityDistanceFromTop = (data, i, j) => {
  let distance = 0;
  let n = i - 1;
  while (n >= 0) {
    distance++;
    if (data[n][j] >= data[i][j]) return distance;
    n--;
  }

  return distance;
};

const visbilityDistanceFromBottom = (data, i, j) => {
  let distance = 0;
  let n = i + 1;
  while (n < data[0].length) {
    distance++;
    if (data[n][j] >= data[i][j]) return distance;
    n++;
  }

  return distance;
};

const buildVisibilityDistanceMap = (data) => {
  return data
    .map((row, i) => row.map((item, j) => {
      return visbilityDistanceFromLeft(data, i, j)
        * visbilityDistanceFromRight(data, i, j)
        * visbilityDistanceFromTop(data, i, j)
        * visbilityDistanceFromBottom(data, i, j);
    }));
};

const puzzle_8b = (file) => {
  const data = readData(file);
  
  return buildVisibilityDistanceMap(data)
    .reduce((acc, row) => acc.concat(row), [])
    .sort((a, b) => b - a)[0];
};

export {
  puzzle_8a,
  puzzle_8b
};