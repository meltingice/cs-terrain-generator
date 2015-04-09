#!/usr/bin/env node

var TerrainGenerator = require('./lib/cs-terrain-generator');
var argv = require('minimist')(process.argv.slice(2), { 
  alias: {
    'smoothness': 's',
    'width': 'w',
    'height': 'h'
  }
});

var output = argv._[0];

if (!output) {
  console.log("Usage: cs-terrain-generator [options] path/to/output.png")
  console.log("Options:");
  console.log("\t-s --smoothness\t(default 1.0)");
  console.log("\t-w --width\t(default 1081)");
  console.log("\t-h --height\t(default 1081)");
  process.exit(1);
}

// Cities: Skylines requires a 1081x1081 image.
var width   = argv.width || 1081,
    height  = argv.height || 1081,
    smoothness = argv.smoothness || 1.0;

console.log("Generating terrain...");
console.log("Width = " + width + ", Height = " + height + ", Smoothness = " + smoothness);

var tg = new TerrainGenerator(width, height, smoothness);
tg.generate();
tg.write(output);
