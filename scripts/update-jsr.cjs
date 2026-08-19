const fs = require("node:fs");
const pkg = require("../package.json");
const jsrPath = "./jsr.json";
const { execSync } = require("node:child_process");

const jsr = JSON.parse(fs.readFileSync(jsrPath, "utf8"));
jsr.version = pkg.version;
fs.writeFileSync(jsrPath, `${JSON.stringify(jsr, null, 2)}\n`);
console.log(`Updated jsr.json to version ${pkg.version}`);

execSync("biome format --write");
execSync("git add jsr.json");
