# CS Terrain Generator

Generate random fractal terrains for use in the game Cities: Skylines. Requires NodeJS/io.js to be installed.

## Install

``` bash
npm install cs-terrain-generator -g
```

## Usage

Simply run the executable to generate a PNG heightmap of the correct size.

``` bash
cs-terrain-generator output.png
```

If you wish to change the fractal smoothness, specify a value between 0.0 and 1.0.

``` bash
cs-terrain-generator -s 0.6 output.png
```

## Importing

For more information on importing heightmaps into Cities: Skylines, check out the [Skylines Wiki](http://www.skylineswiki.com/Map_Editor#Import_Heightmap).
