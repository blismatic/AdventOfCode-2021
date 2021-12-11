const { log } = require("console");
const fs = require("fs");
let data = fs.readFileSync("./08/input.txt", "utf8");
data = data
  .split(/\r?\n/)
  .map((row) => row.split(" | ").map((elem) => elem.split(" ")));
//console.log(data);

// Part 1
let count = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i][1].length; j++) {
    let elem = data[i][1][j];
    if (
      elem.length == 2 ||
      elem.length == 3 ||
      elem.length == 4 ||
      elem.length == 7
    ) {
      count++;
    }
  }
}
console.log(count);

// Part 2
let sumOfDecodedOutputValues = 0;
// loop through data, row by row (row # = i)
for (let i = 0; i < data.length; i++) {
  data[i][0].sort((a, b) => a.length - b.length);
  //log(`Left Side: ${data[i][0]}`);
  //log(`Right Side: ${data[i][1]}`);
  let digits = {
    num0: new Set(),
    num1: new Set(),
    num2: new Set(),
    num3: new Set(),
    num4: new Set(),
    num5: new Set(),
    num6: new Set(),
    num7: new Set(),
    num8: new Set(),
    num9: new Set()
  };

  // loop through left 10 values first
  for (let j = 0; j < data[i][0].length; j++) {
    let elem = data[i][0][j];
    let elemSet = new Set(elem);

    if (elem.length == 2) {
      // must correspond to digit 1
      digits.num1 = elemSet;
    } else if (elem.length == 4) {
      // must correspond to digit 4
      digits.num4 = elemSet;
    } else if (elem.length == 3) {
      // must correspond to digit 7
      digits.num7 = elemSet;
    } else if (elem.length == 7) {
      // must correspond to digit 8
      digits.num8 = elemSet;
    } else if (elem.length == 5) {
      // corresponds to digits 2, 3, and 5
      if (isSuperset(elemSet, digits.num1)) {
        // must correspond to 3, since digit 3 contains both segments of digit 1
        digits.num3 = elemSet;
      } else if (isSuperset(elemSet, difference(digits.num4, digits.num1))) {
        // must correspond to 5, since digit 5 contains the L shape made from the difference of 4 and 1
        digits.num5 = elemSet;
      } else {
        // must correspond to 2, beause it is the only remaining 5 long element
        digits.num2 = elemSet;
      }
    } else if (elem.length == 6) {
      // corresponds to digits 0, 6, and 9
      if (isSuperset(elemSet, digits.num4)) {
        // must correspond to 9, since digit 9 contains all segments of digit 4
        digits.num9 = elemSet;
      } else if (isSuperset(elemSet, difference(digits.num4, digits.num1))) {
        // must correspond to digit 6, since digit 6 contains the L shape but also isn't digit 9
        digits.num6 = elemSet;
      } else {
        // must correspond to 0, because it is the only remaining 6 long element
        digits.num0 = elemSet;
      }
    } else {
      console.error(
        `Something went wrong trying to initialize values into sets.\nelem: ${elem}\nelem.length: ${elem.length}`
      );
    }
  }
  //log(`digits`);
  //log(digits);

  // loop through right 4 output values now
  let decodedOutputValue = "";
  for (let k = 0; k < data[i][1].length; k++) {
    let elem = data[i][1][k];
    let elemSet = new Set(elem);

    if (areSetsEqual(elemSet, digits.num0)) {
      decodedOutputValue += 0;
    } else if (areSetsEqual(elemSet, digits.num1)) {
      decodedOutputValue += 1;
    } else if (areSetsEqual(elemSet, digits.num2)) {
      decodedOutputValue += 2;
    } else if (areSetsEqual(elemSet, digits.num3)) {
      decodedOutputValue += 3;
    } else if (areSetsEqual(elemSet, digits.num4)) {
      decodedOutputValue += 4;
    } else if (areSetsEqual(elemSet, digits.num5)) {
      decodedOutputValue += 5;
    } else if (areSetsEqual(elemSet, digits.num6)) {
      decodedOutputValue += 6;
    } else if (areSetsEqual(elemSet, digits.num7)) {
      decodedOutputValue += 7;
    } else if (areSetsEqual(elemSet, digits.num8)) {
      decodedOutputValue += 8;
    } else if (areSetsEqual(elemSet, digits.num9)) {
      decodedOutputValue += 9;
    } else {
      console.error(`how the fuck did i end up here`);
      /*log('elemSet');
      */
      // cefbgd => length 6, could be 0, 6, or 9
    }
  }
  //log(`row ${i+1} decodedOutputValue: ${decodedOutputValue}`);
  //log();
  sumOfDecodedOutputValues += parseInt(decodedOutputValue);
}
log(sumOfDecodedOutputValues);

// ***************************************
// * Implementing common set operations. *
// ***************************************
function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

function union(setA, setB) {
  let _union = new Set(setA);
  for (let elem of setB) {
    _union.add(elem);
  }
  return _union;
}

function intersection(setA, setB) {
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

function difference(setA, setB) {
  let _difference = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

function areSetsEqual(setA, setB) {
  if (setA.size !== setB.size) {
    return false;
  }
  for (let elem of setA) {
    if (!setB.has(elem)) {
      return false;
    }
  }
  return true;
}