const readData = (file) => {
  return file
    .trimEnd()
    .split('\n')
    .map(line => {
      const match = line.match(/^(R|L|U|D)\s+(\d+)$/);

      return {
        direction: match[1],
        count: parseInt(match[2])
      }
    });
};

const shouldMove = (headPosition, tailPosition) => {
  return (Math.abs(headPosition.x - tailPosition.x) > 1) || (Math.abs(headPosition.y - tailPosition.y) > 1);
};

const moveHead = (headPosition, command) => {
  switch (command.direction) {
    case 'R':
      headPosition.x ++;
      break;
    case 'L':
      headPosition.x --;
      break;
    case 'U':
      headPosition.y ++;
      break;
    case 'D':
      headPosition.y --;
      break;
  }
};

const tailFollowHead = (headPosition, tailPosition) => {
  if (shouldMove(headPosition, tailPosition)) {
    let newX = tailPosition.x;
    let newY = tailPosition.y;

    if (headPosition.x > tailPosition.x) {
      newX = tailPosition.x + 1;
    } else if (headPosition.x < tailPosition.x) {
      newX = tailPosition.x - 1;
    }
    if (headPosition.y > tailPosition.y) {
      newY = tailPosition.y + 1;
    } else if (headPosition.y < tailPosition.y) {
      newY = tailPosition.y - 1;
    }

    tailPosition.x = newX;
    tailPosition.y = newY;
  }
};

const trackTail = (acc, tailPosition) => {
  const signature = `${tailPosition.x},${tailPosition.y}`;
  if (acc.indexOf(signature) < 0) {
    acc.push(signature);
  }
};

const puzzle_9a = (file) => {
  const headPosition = { x: 0, y: 0 };
  const tailPosition = { x: 0, y: 0 };

  return readData(file)
    .reduce((acc, command) => {
      for (let i = 0; i < command.count; i++) {
        moveHead(headPosition, command);
        tailFollowHead(headPosition, tailPosition);
        trackTail(acc, tailPosition);
      }

      return acc;
    }, ['0,0'])
    .length;
};

const puzzle_9b = (file) => {
  const positions = new Array(10).fill().map(p => ({ x: 0, y: 0 }));

  return readData(file)
    .reduce((acc, command) => {
      for (let i = 0; i < command.count; i++) {
        moveHead(positions[9], command);

        for (let j = 8; j >= 0; j--) {
          tailFollowHead(positions[j + 1], positions[j]);
        }

        trackTail(acc, positions[0]);
      }
        
      return acc;
    }, ['0,0'])
    .length;
};

export {
  puzzle_9a,
  puzzle_9b
};