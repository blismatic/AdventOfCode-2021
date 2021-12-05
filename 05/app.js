const fs = require('fs');
let data = fs.readFileSync('./05/input.txt', 'utf-8');

let acData = data.split("\n");
let hydroVents = create2dArrayOfZeroes(1000);

function create2dArrayOfZeroes(size) {
    let result = [];
    for (let row = 0; row < size; row++) {
        let realRow = []
        for (let col = 0; col < size; col++) {
            realRow.push(0);
        }
        result.push(realRow);
    }
    return result;
}

function getCoords(x1, y1, x2, y2, doDiagonalsCount) {
    //console.log(`x1: ${x1}, y1: ${y1}\nx2: ${x2}, y2: ${y2}`);
    let result = [];
    let slope = (y2 - y1) / (x2 - x1);
    //console.log(`slope: ${slope}`);
    //console.log(`Math.abs(slope): ${Math.abs(slope)}`);
    if (x1 == x2) {
        let max = Math.max(y1, y2);
        let min = Math.min(y1, y2);
        for (let i = min; i <= max; i++) {
            let coord = [];
            coord.push(x1);
            coord.push(i);
            result.push(coord);
        }
    } else if (y1 == y2) {
        let max = Math.max(x1, x2);
        let min = Math.min(x1, x2);
        for (let i = min; i <= max; i++) {
            let coord = [];
            coord.push(i);
            coord.push(y1);
            result.push(coord);
        }
    } else if ((Math.abs(slope) == 1) && (doDiagonalsCount == true)) {
        //console.log("i am here");
        // coordinates make a 45 degree angle if the absolute
        // value of the slope is 1
        let amtOfCoords = Math.abs(x1 + x2) + 1;
        let xMax = Math.max(x1, x2), xMin = Math.min(x1, x2);
        let yMax = Math.max(y1, y2), yMin = Math.min(y1, y2);
        if (slope == 1) {
            for (let i = 0; i <= xMax - xMin; i++) {
                let coord = [];
                coord.push(xMin + i);
                coord.push(yMin + i);
                result.push(coord);
            }
        } else if (slope == -1) {
            for (let i = 0; i <= xMax - xMin; i++) {
                let coord = [];
                coord.push(xMin + i);
                coord.push(yMax - i);
                result.push(coord);
            }
        }
        //console.log(result);
    } else {
        //console.error(`Coordinates\nx1: ${x1}, y1: ${y1}, x2: ${x2}, y2: ${y2}\ndo not form a horizontal or vertical line.\n`);
    }
    //console.log();
    return result;
}

function getAllIndexes(arr, val) {
    let indexes = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            indexes.push(i);
        }
    }
    return indexes;
}

function cleanInputData() {
    let cleanData = [];
    for (let i = 0; i < acData.length; i++) {
        let lineSegment = acData[i];
        let cleanRow = [];
        let x1 = "", y1 = "", x2 = "", y2 = "";
        //console.log(`i: ${i} lineSegment: ${lineSegment}`);

        let indexesOfCommas = getAllIndexes(lineSegment, ",");
        let indexOfGreaterThan = getAllIndexes(lineSegment, ">");
        //console.log(indexesOfCommas);
        //console.log(indexOfGreaterThan);

        // store x1
        for (let i = 0; i < indexesOfCommas[0]; i++) {
            x1 += lineSegment.charAt(i);
        }
        cleanRow.push(parseInt(x1));

        // store y1
        for (let i = indexesOfCommas[0] + 1; i < indexOfGreaterThan[0] - 2; i++) {
            y1 += lineSegment.charAt(i);
        }
        cleanRow.push(parseInt(y1));

        // store x2
        for (let i = indexOfGreaterThan[0] + 2; i < indexesOfCommas[1]; i++) {
            x2 += lineSegment.charAt(i);
        }
        cleanRow.push(parseInt(x2));

        // store y2
        if (lineSegment.charAt(lineSegment.length - 1) == "\r") {
            for (let i = indexesOfCommas[1] + 1; i < lineSegment.length - 1; i++) {
                y2 += lineSegment.charAt(i);
            }
            cleanRow.push(parseInt(y2));
        } else {
            for (let i = indexesOfCommas[1] + 1; i < lineSegment.length; i++) {
                y2 += lineSegment.charAt(i);
            }
            cleanRow.push(parseInt(y2));
        }
        cleanData.push(cleanRow);
    }
    return cleanData;
}

let cleanData = cleanInputData();

// Increment each coordinate in hydroVents if it is part of a straight line.
for (let i = 0; i < cleanData.length; i++) {
    let x1 = cleanData[i][0], y1 = cleanData[i][1], x2 = cleanData[i][2], y2 = cleanData[i][3];
    let coords = getCoords(x1, y1, x2, y2, false);
    if (coords.length != 0) {
        for (let j = 0; j < coords.length; j++) {
            hydroVents[coords[j][0]][coords[j][1]] += 1;
        }
    }
}
let count = 0;
for (let row = 0; row < hydroVents.length; row++) {
    let rowStr = "";
    for (let col = 0; col < hydroVents.length; col++) {
        rowStr += `${hydroVents[col][row]}, `;
        if (hydroVents[col][row] >= 2) {
            count++;
        }
    }
    rowStr += "\n";
    //console.log(rowStr);
}
console.log(count);

hydroVents = create2dArrayOfZeroes(1000);
// Increment each coordinate in hydroVents if it is part of a straight line or diagonal.
for (let i = 0; i < cleanData.length; i++) {
    let x1 = cleanData[i][0], y1 = cleanData[i][1], x2 = cleanData[i][2], y2 = cleanData[i][3];
    let coords = getCoords(x1, y1, x2, y2, true);
    if (coords.length != 0) {
        for (let j = 0; j < coords.length; j++) {
            hydroVents[coords[j][0]][coords[j][1]] += 1;
        }
    }
}
count = 0;
for (let row = 0; row < hydroVents.length; row++) {
    let rowStr = "";
    for (let col = 0; col < hydroVents.length; col++) {
        rowStr += `${hydroVents[col][row]}, `;
        if (hydroVents[col][row] >= 2) {
            count++;
        }
    }
    rowStr += "\n";
    //console.log(rowStr);
}
console.log(count);