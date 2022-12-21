const readData = (file) => {
  return file
    .trimEnd()
    .split('\n')
    .reduce((monkeys, line) => {
      let match = line.match(/^(.+): (\d+)$/);
      if (match) {
        monkeys[match[1]] = { command: 'yell', value: parseInt(match[2]) };
      };

      match = line.match(/^(.+): (.+) (.) (.+)$/);
      if (match) {
        monkeys[match[1]] = { command: match[3], a: match[2], b: match[4] };
      }

      return monkeys;
    }, {});
};

const computeValues = (monkeys) => {
  while (true) {
    const unknown = Object.keys(monkeys).filter(m => (monkeys[m].value === undefined && (monkeys[m].command !== 'me')));
    let changed = false;

    unknown.forEach(name => {
      const monkey = monkeys[name];
      const a = monkeys[monkey.a].value;
      const b = monkeys[monkey.b].value;

      monkey.aKnown = a !== undefined;
      monkey.bKnown = b !== undefined;

      if ((a === undefined) || (b === undefined)) return;

      switch (monkey.command) {
        case '+':
          monkey.value = a + b;
          changed = true;
          return;
        case '-':
          monkey.value = a - b;
          changed = true;
          return;
        case '*':
          monkey.value = a * b;
          changed = true;
          return;
        case '/':
          monkey.value = a / b;
          changed = true;
          return;
      }
    });

    if (!changed) return monkeys.root.value;
  }
};

const puzzle_21a = (file) => {
  const monkeys = readData(file);

  return computeValues(monkeys);
};

const resolve = (monkeys, monkey, target) => {
  let value, newTarget;
  
  switch (monkey.command) {
    case 'me':
      return target;
    case '=':
      if (monkey.aKnown) {
        newTarget = monkeys[monkey.a].value;
        value = resolve(monkeys, monkeys[monkey.b], newTarget);
      } else {
        newTarget = monkeys[monkey.b].value;
        value = resolve(monkeys, monkeys[monkey.a], newTarget);
      }
      break;
    case '+':
      if (monkey.aKnown) {
        newTarget = target - monkeys[monkey.a].value;
        value = resolve(monkeys, monkeys[monkey.b], newTarget);
      } else {
        newTarget = target - monkeys[monkey.b].value;
        value = resolve(monkeys, monkeys[monkey.a], newTarget);
      }
      break;
    case '-':
      if (monkey.aKnown) {
        newTarget = monkeys[monkey.a].value - target;
        value = resolve(monkeys, monkeys[monkey.b], newTarget);
      } else {
        newTarget = target + monkeys[monkey.b].value;
        value = resolve(monkeys, monkeys[monkey.a], newTarget);
      }
      break;
    case '*':
      if (monkey.aKnown) {
        newTarget = target / monkeys[monkey.a].value;
        value = resolve(monkeys, monkeys[monkey.b], newTarget);
      } else {
        newTarget = target / monkeys[monkey.b].value;
        value = resolve(monkeys, monkeys[monkey.a], newTarget);
      }
      break;
    case '/':
      if (monkey.aKnown) {
        newTarget = monkeys[monkey.a].value / target;
        value = resolve(monkeys, monkeys[monkey.b], newTarget);
      } else {
        newTarget = monkeys[monkey.b].value * target;
        value = resolve(monkeys, monkeys[monkey.a], newTarget);
      }
      break;
  }

  return value;
};

const puzzle_21b = (file) => {
  const monkeys = readData(file);
  monkeys.root.command = '=';
  monkeys.humn.value = undefined;
  monkeys.humn.command = 'me';

  computeValues(monkeys);

  const unknown = monkeys.root.aKnown ? 'b' : 'a';
  const target = monkeys[monkeys.root[monkeys.root.aKnown ? 'a' : 'b']].value;

  return resolve(monkeys, monkeys.root);

  console.log(monkeys.root, unknown, target)
};

export {
  puzzle_21a,
  puzzle_21b
};