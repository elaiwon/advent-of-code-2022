const readData = (file) => {
  return file
    .trimEnd()
    .split('\n')
    .map(line => {
      let match = line.match(/^\$\s+cd\s+(.+)$/);
      if (match) {
        return {
          instruction: 'cd',
          dir: match[1]
        };
      }

      match = line.match(/^\$\s+ls$/);
      if (match) {
        return {
          instruction: 'ls'
        };
      }

      match = line.match(/^dir\s(.+)$/);
      if (match) {
        return {
          instruction: 'dir',
          dir: match[1]
        };
      }

      match = line.match(/^(\d+)\s+(.+)$/);
      if (match) {
        return {
          instruction: 'file',
          filename: match[2],
          size: parseInt(match[1])
        };
      }

      return { instruction: 'treta' }
    });
};

let fileSystem = {
  parent: null,
  files: {},
  dirs: {}
};
let pwd = fileSystem;

const cdCmd = (command) => {
  switch (command.dir) {
    case '/':
      pwd = fileSystem;
      break;
    case '..':
      pwd = pwd.parent;
      break;
    default:
      if (!pwd.dirs[command.dir]) {
        pwd.dirs[command.dir] = {
          parent: pwd,
          files: {},
          dirs: {}
        };
      }

      pwd = pwd.dirs[command.dir];
      break;
  }
};

const dirCmd = (command) => {
  if (!pwd.dirs[command.dir]) {
    pwd.dirs[command.dir] = {
      parent: pwd,
      files: {},
      dirs: {}
    };
  }
}

const fileCmd = (command) => {
  pwd.files[command.filename] = command.size;
};

const dirSize = (dir) => {
  dir.size = Object.keys(dir.files).reduce((acc, name) => acc + dir.files[name], 0)
    + Object.keys(dir.dirs).reduce((acc, name) => acc + dirSize(dir.dirs[name]), 0);

  return dir.size;
}

const sloppySize = (dir) => {
  return (dir.size <= 100000 ? dir.size : 0)
    + Object.keys(dir.dirs).reduce((acc, name) => acc + sloppySize(dir.dirs[name]), 0);
};

const collectDirSizes = (dir) => {
  return Object.keys(dir.dirs).reduce((acc, name) => acc.concat(collectDirSizes(dir.dirs[name])), [dir.size]);
};

const prepareData = (file) => {
  readData(file)
    .forEach(command => {
      switch (command.instruction) {
        case 'cd':
          cdCmd(command);
          break;
        case 'ls':
          // Do nothing
          break;
        case 'dir':
          dirCmd(command);
          break;
        case 'file':
          fileCmd(command);
          break;
      }
    });

  dirSize(fileSystem);
};

const puzzle_7a = (file) => {
  prepareData(file);

  return sloppySize(fileSystem);
};

const puzzle_7b = (file) => {
  prepareData(file);

  const totalSpace = 70000000;
  const neededSpace = 30000000;
  const freeSpace = totalSpace - fileSystem.size;

  return collectDirSizes(fileSystem)
    .sort((a, b) => a - b)
    .filter(i => i + freeSpace >= neededSpace)[0];
};

export {
  puzzle_7a,
  puzzle_7b
};