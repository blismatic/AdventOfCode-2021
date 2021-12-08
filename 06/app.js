const fs = require('fs');
let data = fs.readFileSync('./06/input.txt', 'utf-8');
data = data.split(",");
//console.log(data);

// Part 1
function iterateDays(numOfDays, arr) {
    //console.log(`Initial state: ${arr}`);
    for (let i = 0; i < numOfDays; i++) {
        for (let j = 0; j < arr.length; j++) {
            let currentFish = arr[j];
            if (currentFish == 0) {
                currentFish = 6;
                arr[j] = currentFish;
                arr.push(9);
            } else {
                currentFish -= 1;
                arr[j] = currentFish;
            }
        }
    }
    return arr
}

//let newData = iterateDays(80, data);
//console.log(newData.length);
console.log(simulate(80, data));

// Part 2
function simulate(numOfDays, arr) {
    // initialize buckets representing each age group of fish
    let fish = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    // assign each fish to its corresponding bucket
    //console.log(`fish before: ${fish}`);
    arr.forEach(x => fish[Number(x)]++);
    //console.log(`fish after: ${fish}`);

    // adjust values in buckets based on previous amounts
    for (let day = 0; day < numOfDays; day++) {
        let newFish = fish.shift();
        fish[6] += newFish;
        fish.push(newFish)
    }

    return fish.reduce((sum, x) => sum + x);
}

console.log(simulate(256, data));