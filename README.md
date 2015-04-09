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

There are multiple options to customize the fractal generation, such as: smoothness, lower clip, and upper clip.

* Smoothness `-s`: changes how "blurry" the final fractal looks. Lower values produce more discernable features. Must be between 0.0 and 1.0.
* Lower clip `-l`: clips data below a certain height value, which creates flat areas on the map. Great for generating oceans, ponds, canyons, etc. Value must be between 0 and 255.
* Upper clip `-u`: clips data above a certain height value, which helps to create plateaus. Value must be between 0 and 255.

Here's an example command that could create some oceans and plateaus:

``` bash
cs-terrain-generator -s 0.5 -l 60 -u 60 output.png
```

## Importing

For more information on importing heightmaps into Cities: Skylines, check out the [Skylines Wiki](http://www.skylineswiki.com/Map_Editor#Import_Heightmap).
