const readData = (file) => {
  return file
    .trimEnd()
    .split('\n')
    .map(l => {
      const match = l.match(/^Sensor at x=([0-9-]+), y=([0-9-]+): closest beacon is at x=([0-9-]+), y=([0-9-]+)$/);

      return {
        sensor: { x: parseInt(match[1]), y: parseInt(match[2]) },
        beacon: { x: parseInt(match[3]), y: parseInt(match[4]) }
      }
    });
};

const occupiedPositions = (l, y) => {
  const verticalSegment = Math.abs(l.sensor.y - y);

  if (verticalSegment > l.distance) return null;

  return {
    start: l.sensor.x - (l.distance - verticalSegment),
    end: l.sensor.x + (l.distance - verticalSegment),
    type: '#'
  };
};

const addDistance = (item) => ({ ...item, distance: Math.abs(item.sensor.x - item.beacon.x) + Math.abs(item.sensor.y - item.beacon.y) });

const groupData = (sections) => {
  return sections
    .reduce ((groupped, section) => {
      let segments = [section];

      for (let i = 0; i < groupped.length; i++) {
        for (let j = 0; j < segments.length; j++) {
          if ((segments[j].start <= groupped[i].end) && (segments[j].end >= groupped[i].start)) {
            if ((segments[j].start < groupped[i].start) && (segments[j].end <= groupped[i].end)) {
              segments.splice(j, 1, 
                { start: segments[j].start, end: groupped[i].start - 1, type: segments[j].type }
              );
            } else if ((segments[j].end > groupped[i].end) && (segments[j].start >= groupped[i].start)) {
              segments.splice(j, 1,
                { start: groupped[i].end + 1, end: segments[j].end, type: segments[j].type }
              );
            } else if ((segments[j].start < groupped[i].start) && (segments[j].end > groupped[i].end)) {
              segments.splice(j, 1,
                { start: segments[j].start, end: groupped[i].start - 1, type: segments[j].type },
                { start: groupped[i].end + 1, end: segments[j].end, type: segments[j].type }
              );
            } else {
              segments.splice(j, 1);
            }
          }
        }
      }

      return groupped.concat(segments)
    }, []);
  };

const puzzle_15a = (file, input) => {
  const line_y = (input && parseInt(input)) || 2000000;

  const data = readData(file);

  const occupied = data
    .reduce((total, item) => {
      if (item.sensor.y === line_y) {
        if (!total.find(l => l.start === item.sensor.x)) {
          total.push({
            start: item.sensor.x,
            end: item.sensor.x,
            type: 'S'
          });
        }
      }

      if (item.beacon.y === line_y) {
        if (!total.find(l => l.start === item.beacon.x)) {
          total.push({
            start: item.beacon.x,
            end: item.beacon.x,
            type: 'B'
          });
        }
      }

      return total;
    }, []);

  const sections = data
    .map(l => addDistance(l))
    .map(l => occupiedPositions(l, line_y))
    .reduce((total, item) => {
      if (item) {
        return total.concat([item]);
      }

      return total;
    }, occupied);

  return groupData(sections)
    .filter(l => l.type === '#')
    .reduce((acc, l) => acc + l.end - l.start + 1, 0);
};

const puzzle_15b = (file, input) => {
  const max = (input && parseInt(input)) || 4000000;

  const data = readData(file);

  for (let line_y = 0; line_y <= max; line_y++) {
    const sections = data
      .map(l => addDistance(l))
      .map(l => occupiedPositions(l, line_y))
      .concat([{ start: 0, end: max, type: '.' }])
      .reduce((total, item) => {
        if (item) {
          return total.concat([item]);
        }

        return total;
      }, []);

    const result = groupData(sections)
      .filter(l => l.type === '.');

    const possibilities = result
      .reduce((acc, l) => acc + l.end - l.start + 1, 0);

    if (possibilities === 1) {
      return (4000000 * result[0].start) + line_y;
    };
  }
};

export {
  puzzle_15a,
  puzzle_15b
};