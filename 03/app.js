const fs = require('fs');
let data = fs.readFileSync('./03/input.txt', 'utf-8');

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

console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));

// Part 2
let oxy = "";
let co2 = "";
let oxyArr = data.slice();
let co2Arr = data.slice();

// Keep cutting down oxygen array until there is only 1 value left
while (oxyArr.length > 1) {
    // Look at each bit position.
    for (let bitPos = 0; bitPos < oxyArr[0].length; bitPos++) {
        // Look at each value in the array, and count how many 0's there are in the current bit position.
        let count0 = 0;
        for (let row = 0; row < oxyArr.length; row++) {
            if (oxyArr[row].charAt(bitPos) == 0) {
                count0++;
            }
        }
        // Figure out the most common value in the current bit position.
        // If 0 and 1 are equally common, take 1 as most common.
        let numOfBits = oxyArr.length;
        let leastCommonBit = "";
        if ((numOfBits - count0) >= count0) {
            leastCommonBit = 0;
        } else {
            leastCommonBit = 1;
        }

        //console.log(`oxyArr: ${oxyArr}`);
        /*console.log(`bitPos: ${bitPos}`);
        console.log(`count0: ${count0}, count1: ${numOfBits - count0}`);
        console.log(`leastCommonBit: ${leastCommonBit}\n`);*/

        // Keep the most common bit column values.
        for (let i = oxyArr.length - 1; i >= 0; i--) {
            if (oxyArr[i].charAt(bitPos) == leastCommonBit) {
                oxyArr.splice(i, 1);
            }
        }
        /*console.log(oxyArr.length);
        console.log(oxyArr);*/
        if (oxyArr.length == 1) {
            oxy = oxyArr[0];
            break;
        }
    }
}

// Keep cutting down c02 array until there is only 1 value left
while (co2Arr.length > 1) {
    // Look at each bit position.
    for (let bitPos = 0; bitPos < co2Arr[0].length - 1; bitPos++) {
        // Look at each value in the array, and count how many 0's there are in the current bit position.
        let count0 = 0;
        for (let row = 0; row < co2Arr.length; row++) {
            if (co2Arr[row].charAt(bitPos) == 0) {
                count0++;
            }
        }
        // Figure out the least common value in the current bit position.
        // If 0 and 1 are equally common, take 0 as least common.
        let numOfBits = co2Arr.length;
        let mostCommonBit = "";
        if ((numOfBits - count0) >= count0) {
            mostCommonBit = 1;
        } else {
            mostCommonBit = 0;
        }

        /*console.log(`co2Arr.length: ${co2Arr.length}`);
        console.log(`co2Arr: ${co2Arr}\n********`);
        console.log(`bitPos: ${bitPos}`);
        console.log(`count0: ${count0}, count1: ${numOfBits - count0}`);
        console.log(`mostCommonBit: ${mostCommonBit}\n`);*/

        // Keep the most common bit column values.
        for (let i = co2Arr.length - 1; i >= 0; i--) {
            if (co2Arr[i].charAt(bitPos) == mostCommonBit) {
                co2Arr.splice(i, 1);
            }
        }
        if (co2Arr.length == 1) {
            co2 = co2Arr[0];
            break;
        }
    }
}

console.log(parseInt(oxy, 2) * parseInt(co2, 2));