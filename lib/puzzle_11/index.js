const getItem = (data) => /^\d+$/.test(data) ? parseInt(data) : data.trim();

const readData = (file) => {
  return file
    .trimEnd()
    .split('\n\n')
    .map(monkey => {
      const data = monkey.split('\n');
      const matchMonkey = data[0].match(/^Monkey\s+(\d+):$/m);
      const matchStarting = data[1].match(/^\s*Starting items:\s+(.+)$/);
      const matchOperation = data[2].match(/^\s*Operation: new = (.+)\s*(\*|\+)\s*(.+)$/);
      const matchTest = data[3].match(/^\s*Test: divisible by\s+(\d+)$/);
      const matchTrue = data[4].match(/^\s*If true: throw to monkey\s+(\d+)$/);
      const matchFalse = data[5].match(/^\s*If false: throw to monkey\s+(\d+)$/);

      return {
        index: parseInt(matchMonkey[1]),
        items: matchStarting[1].split(/,\s*/).map(i => parseInt(i)),
        operation: {
          operator: matchOperation[2],
          a: getItem(matchOperation[1], parseInt),
          b: getItem(matchOperation[3], parseInt)
        },
        divisibleBy: parseInt(matchTest[1]),
        true: parseInt(matchTrue[1]),
        false: parseInt(matchFalse[1]),
        inspectionCount: 0
      };
    });
};

const inspect = (monkey, item) => {
  const a = monkey.operation.a === 'old' ? item : monkey.operation.a;
  const b = monkey.operation.b === 'old' ? item : monkey.operation.b;

  switch (monkey.operation.operator) {
    case '*':
      return a * b;
    case '+':
      return a + b;
  }
};

const puzzle_11a = (file) => {
  const monkeys = readData(file);

  for (let i = 0; i < 20; i++) {
    monkeys.forEach(m => {
      m.items.forEach((item, i) => {
        const inspected = inspect(m, item);
        const bored = Math.floor(inspected / 3);
        const nextMonkey = (bored % m.divisibleBy) === 0 ? m.true : m.false;

        monkeys[nextMonkey].items.push(bored);

        m.inspectionCount++;
      });

      m.items = [];
    });
  }

  return monkeys
    .map(m => m.inspectionCount)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, i) => acc * i, 1);
};

const puzzle_11b = (file) => {
  const monkeys = readData(file);
  const lcd = monkeys.map(m => m.divisibleBy).reduce((acc, i) => acc * i);

  for (let i = 0; i < 10000; i++) {
    monkeys.forEach(m => {
      m.items.forEach((item) => {
        const inspected = inspect(m, item);
        const nextMonkey = (inspected % m.divisibleBy) === 0 ? m.true : m.false;

        monkeys[nextMonkey].items.push(inspected % lcd);

        m.inspectionCount++;
      });

      m.items = [];
    });
  }

  return monkeys
    .map(m => m.inspectionCount)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, i) => acc * i, 1);
};

export {
  puzzle_11a,
  puzzle_11b
};