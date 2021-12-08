const fs = require('fs');
let data = fs.readFileSync('./06/test.txt', 'utf-8');
data = data.split(",");
//console.log(data);

function iterateDays(numOfDays, arr) {
    //console.log(`Initial state: ${arr}`);
    for (let i = 0; i < numOfDays; i++) {
        for (let j = 0; j < arr.length; j++) {
            let currentFish = arr[j];
            //console.log(`currentFish: ${currentFish}`);

            if (currentFish == 0) {
                currentFish = 6;
                arr[j] = currentFish;
                arr.push(9);
            } else {
                //console.log(`subtracting 1 from ${currentFish}`);
                currentFish -= 1;
                arr[j] = currentFish;
            }
        }
        //console.log(`After ${i+1} days: ${arr}`);
    }
    return arr
}

console.log(iterateDays(256, data).length);