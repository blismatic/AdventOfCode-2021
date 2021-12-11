const { log } = require("console");
const fs = require("fs");
let data = fs.readFileSync("./10/input.txt", "utf8");
data = data.split(/\r?\n/);
//console.log(data);

let scoring = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137
};

let symbols = {
  open: ["(", "[", "{", "<"],
  close: [")", "]", "}", ">"]
};

// Part 1
let syntaxErrorScore = 0;
let autoCompleteScores = [];

for (let i = 0; i < data.length; i++) {
  let currentRow = data[i];
  let stack = [];
  let corrupted = false;
  for (let j = 0; j < data[i].length; j++) {
    let currentChar = currentRow[j];
    if (symbols.open.includes(currentChar)) {
      stack.push(currentChar);
    } else if (symbols.close.includes(currentChar)) {
      let topOfStack = stack[stack.length - 1];
      let symbolIndex = symbols.close.indexOf(currentChar);
      if (
        !(topOfStack === undefined) &&
        topOfStack == symbols.open[symbolIndex]
      ) {
        stack.pop();
      } else {
        syntaxErrorScore += scoring[currentChar];
        corrupted = true;
        break;
      }
    } else {
      console.error(`unexpected symbol read in part 1: ${currentChar}`);
    }
  }

  if (!corrupted) {
    let autoCompleteScore = 0;
    //log(stack);
    let length = stack.length;
    for (let k = 0; k < length; k++) {
      let currentChar = stack.pop();
      let score = symbols.open.indexOf(currentChar) + 1;
      autoCompleteScore *= 5;
      autoCompleteScore += score;
    }
    //log(`autoCompleteScore: ${autoCompleteScore}\n`);
    autoCompleteScores.push(autoCompleteScore);
  }
}

log(syntaxErrorScore);

// Part 2
let length = autoCompleteScores.length;
let median = Math.floor(length / 2);
autoCompleteScores.sort(function (a, b) {
  return a - b;
});
//log(autoCompleteScores);

log(autoCompleteScores[median]);