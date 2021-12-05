const fs = require('fs');
let data = fs.readFileSync('./04/test.txt', 'utf-8');

function removeWhiteSpace(item) {
    return item != "";
}

class Tile {
    constructor(value, called) {
        this.value = value,
        this.called = called;
    }
}

// remove the draw order from the input, store separately.
let drawOrder = data.split("\r\n")[0];
//console.log(`drawOrder: ${drawOrder}`);

data = data.split("\r\n").slice(2);

// individual boards are stored as an array of 25 elements, where each element is a Tile object.
// each board is pushed to a master array called boards.
let boards = [];
let board = [];
for (let row = 0; row < data.length; row++) {
    let actualRow = data[row].split(" ").filter(removeWhiteSpace);
    if ((data[row] != "") && (actualRow.length != 0)) {
        for (let element = 0; element < actualRow.length; element++) {
            board.push(new Tile(actualRow[element], false));
        }
        if (row == data.length - 1) {
            boards.push(board)
        }
    } else if (data[row] == "") {
        boards.push(board);
        board = [];
    }
}
console.log(boards);