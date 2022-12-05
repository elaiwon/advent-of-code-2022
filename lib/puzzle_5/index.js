const readData = (file) => {
  const sections = file
    .trimEnd()
    .split('\n\n')
    .map(line => line.split('\n'));
    
  const map = sections[0]
    .slice(0, -1)
    .map(l => l
      .match(/.{3,4}/g)
      .map(i => i.match(/\[\w\]/))
      .map(i => i ? i[0] : null));

  const indexes = sections[0]
    .slice(-1)[0]
    .match(/\d+/g)
    .map(i => parseInt(i));

  const commands = sections[1]
    .map(l => l.match(/move (\d+) from (\d+) to (\d+)/))
    .map(l => {
      return {
        count: l[1],
        start: l[2] - 1,
        end: l[3] - 1
      };
    });

  return { map, indexes, commands };
};

const createStacks = (data) => {
  const stacks = [];

  for (let j = 0; j < data.indexes.length; j++) {
    const row = [];

    for (let i = data.map.length - 1; i >= 0; i--) {
      if (data.map[i][j]) row.push(data.map[i][j]);
    }

    stacks.push(row);
  }

  return stacks;
};

const puzzle_5a = (file) => {
  const data = readData(file);
  const stacks = createStacks(data);

  data.commands.forEach(command => {
    console.log(`move ${command.count} from ${command.start + 1} to ${command.end + 1}`);
    stacks[command.end] = stacks[command.end]
      .concat(stacks[command.start]
        .splice(-command.count, command.count)
        .reverse());
  });

  return stacks.reduce((acc, item) => acc + item[item.length - 1], '').replace(/[\[\]]/g, '');
};

const validate_5a = (answer) => {
  return answer === 'CMZ';
};

const puzzle_5b = (file) => {
  const data = readData(file);
  const stacks = createStacks(data);

  data.commands.forEach(command => {
    console.log(`move ${command.count} from ${command.start + 1} to ${command.end + 1}`);
    stacks[command.end] = stacks[command.end]
      .concat(stacks[command.start]
        .splice(-command.count, command.count));
  });

  return stacks.reduce((acc, item) => acc + item[item.length - 1], '').replace(/[\[\]]/g, '');
};

const validate_5b = (answer) => {
  return answer === 'MCD';
};

export {
  puzzle_5a,
  puzzle_5b,
  validate_5a,
  validate_5b
};