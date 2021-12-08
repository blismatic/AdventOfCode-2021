const fs = require('fs');
let data = fs.readFileSync('./08/input.txt', 'utf-8');
data = data.split("\r\n");
//console.log(data);
let tempData = [];
for (let i = 0; i < data.length; i++) {
    let pipeIndex = 59;

    let tempArr = [];
    let left = "";
    let right = "";
    for (let j = 0; j < pipeIndex - 1; j++) {
        left += data[i].charAt(j);
    }
    for (let j = pipeIndex + 2; j < data[i].length; j++) {
        right += data[i].charAt(j);
    }

    left = left.split(" ");
    right = right.split(" ");
    tempArr.push(left);
    tempArr.push(right);

    tempData.push(tempArr);
}
// 1 has 2 segments
// 4 has 4 segments
// 7 has 3 segments
// 8 has 7 segments

// Part 1
let count = 0;
for (let i = 0; i < tempData.length; i++) {
    let rightSide = tempData[i][1];
    for (let j = 0; j < rightSide.length; j++) {
        if (rightSide[j].length == 2) {
            count++;
        } else if (rightSide[j].length == 4) {
            count++;
        } else if (rightSide[j].length == 3) {
            count++;
        } else if (rightSide[j].length == 7) {
            count++
        }
    }
}
console.log(count);