const { log } = require("console");
const fs = require("fs");
let data = fs.readFileSync("./11/input.txt", "utf8");
data = data.split(/\r?\n/).map(x => x.split("").map(y => parseInt(y)));
//log(data);

function printGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        let tempStr = "";
        for (let j = 0; j < grid[i].length; j++) {
            tempStr += data[i][j];
        }
        log(tempStr);
    }
    log();
}

function flash(row, col, flashed = newSet()) {
    let position = `${row}${col}`;
    // Break out if on the edge of the grid, or if the current row/col has already flashed.
    if (row < 0 || row > data.length - 1) return;
    if (col < 0 || col > data[0].length - 1) return;
    if (flashed.has(position)) return;

    // Increase energy level of current octopus.
    let energyLevel = data[row][col];
    let newEnergyLevel = energyLevel + 1;
    data[row][col] = newEnergyLevel;
    if (newEnergyLevel <= 9) return;

    flashed.add(position);
    data[row][col] = 0;
    // Top left, top, and top right.
    flash(row - 1, col - 1, flashed);
    flash(row - 1, col, flashed);
    flash(row - 1, col + 1, flashed);

    // Left and right.
    flash(row, col - 1, flashed);
    flash(row, col + 1, flashed);

    // Bottom left, bottom, and bottom right.
    flash(row + 1, col - 1, flashed);
    flash(row + 1, col, flashed);
    flash(row + 1, col + 1, flashed);
}

function step() {
    let flashed = new Set();
    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data.length; col++) {
            flash(row, col, flashed);
        }
    }
    return flashed.size;
}

// Part 1
let flashCount = 0;
for (let i = 0; i < 100; i++) {
    flashCount += step();
}
log(flashCount);

// Part 2
data = fs.readFileSync("./11/input.txt", "utf8");
data = data.split(/\r?\n/).map(x => x.split("").map(y => parseInt(y)));

let stepCount = 1;
while (true) {
    let flashCount = step();
    if (flashCount == 100) {
        break;
    }
    stepCount++;
}
log(stepCount);