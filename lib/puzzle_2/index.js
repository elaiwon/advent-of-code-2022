const STRATEGY = {
  opponent: {
    A: {
      name: "Rock",
      playCode: "Y"
    },
    B: {
      name: "Paper",
      playCode: "Z"
    },
    C: {
      name: "Scissors",
      playCode: "X"
    }
  },
  me: {
    X: {
      name: "Rock",
      points: 1
    },
    Y: {
      name: "Paper",
      points: 2
    },
    Z: {
      name: "Scissors",
      points: 3
    }
  }
};
const PLAYBOOK = {
  Rock: {
    win: "Scissors",
    loose: "Paper"
  },
  Paper: {
    win: "Rock",
    loose: "Scissors"
  },
  Scissors: {
    win: "Paper",
    loose: "Rock"
  }
};

const readPlay = (file) => {
  return file
    .trim()
    .split('\n')
    .map(line => {
      const match = line.match(/^([ABC])\s+([XYZ])$/);
      return {
        opponent: match[1],
        me: match[2]
      };
    });
};

const getShapePoints = (play) => {
  return STRATEGY.me[play.me].points;
};

const getPlayPoints = (play) => {
  const idealPlay = STRATEGY.opponent[play.opponent].playCode;

  if (idealPlay === play.me) return 6;

  if (STRATEGY.opponent[play.opponent].name === STRATEGY.me[play.me].name) return 3;

  return 0;
};

const puzzle_2a = (file) => {
  const play = readPlay(file);
  console.log(play)

  return play.reduce((acc, line) => {
    const shapePoints = getShapePoints(line);
    const playpoints = getPlayPoints(line);

    return acc + shapePoints + playpoints;
  }, 0);
};

const validate_2a = (answer) => {
  return answer === 15;
};

const getCleverShapePoints = (shape) => {
  return Object.values(STRATEGY.me).find(s => s.name === shape).points;
};

const puzzle_2b = (file) => {
  const play = readPlay(file);

  return play.reduce((acc, line) => {
    const opponent = STRATEGY.opponent[line.opponent].name;
    const toWin = PLAYBOOK[opponent].loose;
    const toLoose = PLAYBOOK[opponent].win;
    let shapePoints;

    switch (line.me) {
      case 'X':
        // We have to lose
        return acc + 0 + getCleverShapePoints(toLoose);
      case 'Y':
        // We have to draw
        return acc + 3 + getCleverShapePoints(opponent);
      case 'Z':
        // We have to win
        return acc + 6 + getCleverShapePoints(toWin);
    }
  }, 0);
};

const validate_2b = (answer) => {
  return answer === 12;
};

export {
  puzzle_2a,
  puzzle_2b,
  validate_2a,
  validate_2b
};