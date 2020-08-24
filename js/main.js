function minWalk(gridList, startX, startY, endX, endY) {
  const grid = gridParser(gridList);
  if (!grid) {
    console.log("Invalid data");
    return {
      success: false,
    };
  }
  const end = [endX, endY]; //save end
  const queue = []; // will store path

  grid[startX][startY] = 1;
  queue.push([[startX, startY]]); // start of path

  while (queue.length > 0) {
    const path = queue.shift(); // get last success path
    const pos = path[path.length - 1]; //  and then the last position from it
    const isWay = neighbors(pos, grid);

    for (let i = 0; i < isWay.length; i++) {
      if (isWay[i][0] == end[0] && isWay[i][1] == end[1]) {
        path.push(end);
        return {
          success: true,
          path: path,
          steps: path.length - 1,
        };
      }
      if (
        isWay[i][0] < 0 ||
        isWay[i][0] >= grid[0].length ||
        isWay[i][1] < 0 ||
        isWay[i][1] >= grid[0].length ||
        grid[isWay[i][0]][isWay[i][1]] != 0
      ) {
        continue;
      }

      grid[isWay[i][0]][isWay[i][1]] = 1;
      queue.push(path.concat([isWay[i]]));
    }
  }

  return {
    success: false,
  };
}
//search for neighboring cells
function neighbors(position, grid) {
  var ret = [];
  var x = position[0];
  var y = position[1];
  // West
  if (grid[x - 1] && grid[x - 1][y] === 0) {
    ret.push([x - 1, y]);
  }
  // East
  if (grid[x + 1] && grid[x + 1][y] === 0) {
    ret.push([x + 1][y]);
  }
  // South
  if (grid[x] && grid[x][y - 1] === 0) {
    ret.push([x, y - 1]);
  }
  // North
  if (grid[x] && grid[x][y + 1] === 0) {
    ret.push([x, y + 1]);
  }
  // Southwest
  if (grid[x - 1] && grid[x - 1][y - 1] === 0) {
    ret.push([x - 1, y - 1]);
  }
  // Southeast
  if (grid[x + 1] && grid[x + 1][y - 1] === 0) {
    ret.push([x + 1, y - 1]);
  }
  // Northwest
  if (grid[x - 1] && grid[x - 1][y + 1] === 0) {
    ret.push([x - 1, y + 1]);
  }
  // Northeast
  if (grid[x + 1] && grid[x + 1][y + 1] === 0) {
    ret.push(grid[(x + 1, y + 1)]);
  }
  return ret;
}
//limitations
function gridParser(gridRaw) {
  if (gridRaw.length < 1 || gridRaw.length > 100) {
    return false;
  }
  // check correct data
  let fistRowLength = gridRaw[0].length;

  if (
    gridRaw.find((row) => {
      row.length !== fistRowLength;
    })
  ) {
    return false;
  }
  return gridRaw.map((row) => {
    return row.split("").map((e) => (e === "." ? 0 : 1));
  });
}
const result = minWalk([".X.", ".X.", "..."], 2, 1, 0, 2);
const message = result.success
  ? "Необходимо выполнить " + result.steps + " шага"
  : "Путь не найден";

//point movement
$("#result")
  .text(message)
  .append(
    "<p>Путь : " + result.path.map((p) => `(${p[0]}.${p[1]})`).join(" > ")
  );
