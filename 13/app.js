const { log } = require("console");
const fs = require("fs");
let data = fs.readFileSync("./13/test.txt", "utf8");
let instructions = data.split(/\r?\n/).splice(-1, 2);
data = data.split(/\r?\n/).map(x => x.split(",").map(y => parseInt(y)));
log(data);
log(instructions);