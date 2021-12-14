const { log } = require("console");
const fs = require("fs");

let data = fs.readFileSync("./14/test.txt", "utf8");
data = data.split(/\r?\n/);
let polymerTemplate = data.splice(0, 1)[0];
let pairInsertRules = data.splice(1).map(x => x.split(" -> "));

log('Polymer Template');
log(polymerTemplate);
log('\nPair Insertion Rules');
log(pairInsertRules);