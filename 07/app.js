const fs = require('fs');
let data = fs.readFileSync('./07/input.txt', 'utf-8');
data = data.split(",");
//console.log(data);
//console.log(data.length);

for (let i = 0; i < data.length; i++) {
    data[i] = parseInt(data[i]);
}

let max = data.reduce(function(a, b) {
    return Math.max(a, b);
}, 0);

// Part 1
let bestFuel = Infinity;
for (let i = 0; i < max + 1; i++) {
    let totalFuel = 0;
    for (let j = 0; j < data.length; j++) {
        totalFuel += Math.abs(data[j] - i);
    }
    if (totalFuel < bestFuel) {
        bestFuel = totalFuel;
    }
}
console.log(bestFuel);

// Part 2
function summation(num) {
    let total = 0;
    for (let i = 1; i <= num; i++) {
        total += i;
    }
    return total;
}

// console.log(16-5);
// console.log(11+10+9+8+7+6+5+4+3+2+1);
// console.log(summation(16-5));

bestFuel = Infinity;
for (let i = 0; i < max + 1; i++) {
    let totalFuel = 0;
    for (let j = 0; j < data.length; j++) {
        let distance = Math.abs(data[j] - i);
        totalFuel += summation(distance);
    }
    if (totalFuel < bestFuel) {
        bestFuel = totalFuel;
    }
}
console.log(bestFuel);