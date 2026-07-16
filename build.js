"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const output = path.join(root, "dist");
const files = [
    "index.html",
    "index.js",
    "seed-info.js",
    "styles.css",
    "favicon.ico",
    "Lexend.woff2"
];
const directories = ["gifs", "images", "public"];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const file of files) {
    fs.copyFileSync(path.join(root, file), path.join(output, file));
}

for (const directory of directories) {
    fs.cpSync(path.join(root, directory), path.join(output, directory), {
        recursive: true,
        filter: source => path.basename(source) !== ".DS_Store"
    });
}

console.log("Built YARAW into dist/");
