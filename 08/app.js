const { log } = require("console");
const fs = require("fs");
let data = fs.readFileSync("./08/test.txt", "utf8");
data = data.split(/\r?\n/).map((row) => row.split(" | ").map((elem) => elem.split(" ")));
//console.log(data);

// Part 1
let count = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i][1].length; j++) {
    let elem = data[i][1][j];
    if (elem.length == 2 || elem.length == 3 || elem.length == 4 || elem.length == 7) {
      count++;
    }
  }
}
console.log(count);

// Part 2
for (let i = 0; i < data.length; i++) {
  log(`row: ${data[i][0]}`);

  for (let j = 0; j < data[i].length; j++) {
    let elem = data[i][0][j];
    for (let k = 0; k < elem.length; k++) {
      if (elem.length == 2) {
        // do something
      } else {
        console.error(`Something went wrong trying to initialize values into sets.\nelem: ${elem}\nelem.length: ${elem.length}`);
      }
    }
  }
}

/*
https://2ality.com/2015/01/es6-set-operations.html
UNKNOWN segments: _, _, _, _, _, _, _
KNOWN segments:   a, _, _, _, _, _, _
                  a, _, _, d, _, _, _
                  a, b, _, d, _, _, _
                  a, b, _, d, _, _, g
                  a, b, _, d, e, _, g
                  a, b, _, d, e, f, g
                  a, b, c, d, e, f, g

if length of element is 2 (has to map to 1)
  set 1 = contents of element
    segment "c" = element[0] and segment "f" = element[1]
      or
    segment "f" = element[0] and segment "c" = element[1]
else if length of element is 3 (has to map to 7)
  set 7 = set 1 + leftover element
    segment "a" = difference (set1, set7)
else if length of element is 4 (has to map to 4)
  set  4 = set 1 + leftover elements
  segment "d" = difference( intersect(set3, set4), set1)
  segment "b" = difference(set4, (set1 + segment d)

else if length of element is 5
  could be set 2, set 3, or set 5
    set 3 = set 1 + leftover elements

    find the three letters that they all share
      find which of those 3 letters is shared with set 4
        that letter equals segment "d"

else if length of element is 6
  could be set 0, set 6, or set 9
    segment "g" = elementsLength6 - set7 - b - d

else if length of element is 7 (has to map to 8)
  set8 = contents of element
  segment "e" = difference (set8 - set9)

segment "f" = intersection(set5, set1)
segment "c" = difference(set1, f)
*/

// Implementing common set operations.
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
  //log(`setA.length: ${setA.length}, setB.length: ${setB.length}`);
  let _difference = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}