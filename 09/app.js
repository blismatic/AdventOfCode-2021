const { log } = require("console");
const fs = require("fs");
let data = fs.readFileSync("./src/input.txt", "utf8");
data = data.split(/\r?\n/).map((row) => row.split(""));
//console.log(data);

// Part 1
let riskLevels = [];
let rows = data.length;
let columns = data[0].length;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let curValue = data[i][j];

    let up = !(data[i - 1] === undefined) ? data[i - 1][j] : undefined;
    let down = !(data[i + 1] === undefined) ? data[i + 1][j] : undefined;
    let left = !(data[i][j - 1] === undefined) ? data[i][j - 1] : undefined;
    let right = !(data[i][j + 1] === undefined) ? data[i][j + 1] : undefined;
    let adjacent = {
      up: up,
      down: down,
      left: left,
      right: right
    };

    /*log(`row: ${i}, col: ${j}`);
    log(adjacent);
    log();*/
    //log(`curValue: ${curValue}`);
    let upBool =
      (adjacent.up !== undefined && curValue < adjacent.up) ||
      adjacent.up === undefined;
    let downBool =
      (adjacent.down !== undefined && curValue < adjacent.down) ||
      adjacent.down === undefined;
    let leftBool =
      (adjacent.left !== undefined && curValue < adjacent.left) ||
      adjacent.left === undefined;
    let rightBool =
      (adjacent.right !== undefined && curValue < adjacent.right) ||
      adjacent.right === undefined;
    if (upBool && downBool && leftBool && rightBool) {
      riskLevels.push(parseInt(data[i][j]) + 1);
    }
  }
}

log(riskLevels.reduce((sum, x) => sum + x, 0));

// Part 2
