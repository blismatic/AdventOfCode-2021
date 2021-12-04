const fs = require('fs');
let data = fs.readFileSync('./03/test.txt', 'utf-8');

// Part 1
let gammaRate = "";
let epsilonRate = "";

data = data.split("\n");

for (let col = 0; col < data[0].length; col++) {
    let c0 = 0, c1 = 0;
    for (let row = 0; row < data.length; row++) {
        data[row].charAt(col) == 0 ? c0++ : c1++;
    }
    c0 >= c1 ? gammaRate += 0 : gammaRate += 1;
    c0 >= c1 ? epsilonRate += 1 : epsilonRate += 0;
}

//console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));

// Part 2
let oxy = "", c02 = "";
let oxyArr = data.slice();
let c02Arr = data.slice();
let numOfBits = oxyArr.length;

// Keep cutting down oxygen array until there is only 1 value left
while (oxyArr.length > 1) {
    // Look at each bit position.
    for (let bitPos = 0; bitPos < oxyArr[0].length - 1; bitPos++) {
        let leastCommonBit = "";
        // Look at each value in the array.
        let count0 = 0;
        for (let row = 0; row < oxyArr.length; row++) {
            // Figure out the most common value in the current bit position.
            // If 0 and 1 are equally common, take 1 as most common.

            // Count how many 0's are in the current bit position.
            if (oxyArr[row].charAt(bitPos) == 0) {
                count0++;
            }

            if ((numOfBits - count0) >= count0) {
                leastCommonBit = "0";
            } else {
                leastCommonBit = "1";
            }
        }
        console.log(`bitPos: ${bitPos}`);
        console.log(`count0: ${count0}, count1: ${numOfBits - count0}`);
        console.log(`leastCommonBit: ${leastCommonBit}\n`);

        // Keep the most common bit column values.
        for (let i = oxyArr.length - 1; i >= 0; i--) {
            console.log(`oxyArr: ${oxyArr}`);
            console.log(`i: ${i}`);
            console.log(`oxyArr[i]: ${oxyArr[i]}`);
            console.log(`oxyArr[i].charAt(bitPos): ${oxyArr[i].charAt(bitPos)}`);
            if (oxyArr[i].charAt(bitPos) == leastCommonBit) {
                oxyArr.splice(i, 1);
            }
        }
    }
}

//console.log(oxyArr);

// Keep cutting down c02 array until there is only 1 value left
/*while (c02Arr.length > 1) {
    // Look at each bit position.

    // Figure out the least common value in the current bit position.
    // If 0 and 1 are equally common, take 0 as least common.

    // Keep the least common values.
}*/

//console.log(parseInt(oxy, 2) * parseInt(c02, 2));