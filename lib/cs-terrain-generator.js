var fs = require('fs');
var PNG = require('pngjs').PNG;
var generateTerrain = require('fractal-terrain-generator').generateTerrain;

module.exports = (function () {
  var TerrainGenerator = function (width, height, smoothness, lowerClip, upperClip) {
    this.width = width;
    this.height = height;
    this.smoothness = smoothness;
    this.lowerClip = lowerClip;
    this.upperClip = 255 - upperClip;
    this.png = this.createPng();
  };

  TerrainGenerator.prototype.generate = function () {
    var terrain = generateTerrain(this.width, this.height, this.smoothness);

    var row, rgb, pixelData = [];
    for (var y = 0; y < terrain.length - 1; y++) {
      row = terrain[y];
      for (var x = 0; x < row.length - 1; x++) {
        rgb = this.pointToRgb(row[x]);
        pixelData.push(rgb, rgb, rgb, 255);
      }
    }

    this.png.data = pixelData;
  };

  TerrainGenerator.prototype.write = function (output) {
    this.png
      .pack()
      .pipe(fs.createWriteStream(output))
      .on('finish', function () {
        console.log("PNG written to " + output);
      });
  }

  // Points range in value from [-1.0, 1.0], so we need to normalize them
  // to be [0, 255].
  TerrainGenerator.prototype.pointToRgb = function (point) {
    return this.clampRgb(
      parseInt(
        ((point + 1.0) / 2.0) * 255
      , 10)
    ) - this.lowerClip;
  };

  TerrainGenerator.prototype.clampRgb = function (rgb) {
    if (rgb < this.lowerClip) return this.lowerClip;
    if (rgb > this.upperClip) return this.upperClip;
    return rgb;
  };

  TerrainGenerator.prototype.createPng = function () {
    return new PNG({filterType: -1, width: this.width, height: this.height});
  }

  return TerrainGenerator;
}());
