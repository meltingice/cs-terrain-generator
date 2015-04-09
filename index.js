#!/usr/bin/env node

var TerrainGenerator = require('./lib/cs-terrain-generator');
var argv = require('minimist')(process.argv.slice(2), { 
  alias: {
    'smoothness': 's',
    'width': 'w',
    'height': 'h',
    'lowerclip': 'l',
    'upperclip': 'u'
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
    lowerClip = argv.lowerclip || 0,
    upperClip = argv.upperclip || 0,
    smoothness = argv.smoothness || 1.0;

if (lowerClip > 255 || upperClip > 255) {
  console.log("ERROR: lower/upper clip must be between [0, 255].");
  process.exit(1);
}

if (lowerClip + upperClip > 255) {
  console.log("ERROR: invalid values for lower and upper clips. Upper + lower clip cannot be greater than 255.");
  process.exit(1);
}

if (smoothness < 0.0 || smoothness > 1.0) {
  console.log("ERROR: smoothness must be between [0.0, 1.0].");
  process.exit(1);
}

console.log("Generating terrain...");
console.log("Width = " + width + ", Height = " + height + ", Smoothness = " + smoothness);
console.log("Lower clip = " + lowerClip + ", Upper clip = " + upperClip);

var tg = new TerrainGenerator(width, height, smoothness, lowerClip, upperClip);
tg.generate();
tg.write(output);
