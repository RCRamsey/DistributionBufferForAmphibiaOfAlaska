//using Turf to build Hex grid of polygons over an area
// using Turf to count number of points in polygon

// using core fs module to read files into script and write output to json
const fs = require("fs");
const turf = require("@turf/turf");
const chalk = require("chalk");

fs.readFile(__dirname + "/../data/ak_ids_douglas_fir_beetle2.json", "utf8", (err, data) => {
  if (err) throw err;

  // parse the incoming GeoJSON text
  const beetle_damage = JSON.parse(data);

  createHexGrid(beetle_damage);
});

function createHexGrid(beetle_damage) {
    // use turf to get a bounding box of our points, 
    const bbox = turf.bbox(beetle_damage)
  
    // OR concentrate the map on Alaska with hardcode a bbox [ minX, minY, maxX, maxY ]
    // 🧯 hardcoded bounding box doesn't pull any counts?
    // const bbox = [-179.148909, 51.214183, -179.77847, 71.365162];
  
    // define cell Diameter
    // units options default to kilometers (can use degrees, radians, miles, kilometers)
    const cellSide = 0.5;
    // define units
    const options = {
      units: "degrees" //defining the use of degrees
    };
    // create the hex polygons
    let hexgrid = turf.hexGrid(bbox, cellSide, options);
  
    console.log(hexgrid);
  
    sumPoints(beetle_damage, hexgrid);
  }// end createHexGrid() function
  

  function sumPoints(beetle_damage, hexgrid) {
    // option for turf.booleanPointInPolygon()
    // and other variables don't
    // need redefined with each loop
    const options = {
      ignoreBoundary: true
    };
  
    let count;
  
    // // loop through each hex in hexgrid
    turf.featureEach(hexgrid, (hex, i) => {
      // reset counter to zero for each hex
      count = 0;
  
      // loop through each point in beetle_damage
      turf.featureEach(beetle_damage, point => {
        // if the point is inside the hex
        if (turf.booleanPointInPolygon(point, hex, options)) {
          count++; // increment by one
        }
      });
  
      if (count > 0) {
        // output progress
        console.log(chalk.green("adding count of " + count + " to hex #: " + i));
      }
  
      // update hex properties with count
      hex.properties = Object.assign({}, hex.properties, {
        count: count
      });
    });
  
    console.log(chalk.blue("ready to write the hexgrid to file"));
  
    // truncate the coordinate precision to reduce file size
    hexgrid = turf.truncate(hexgrid, {
      precision: 5
    });
  
    writeHexGrid(hexgrid);
  } //end sumPoints() function
  

  function writeHexGrid(hexgrid) {
    // stringify the hexgrid and write to file
    fs.writeFile(
      __dirname + "/../data/ak-hexgrid2.json",
      JSON.stringify(hexgrid),
      "utf-8",
      err => {
        if (err) throw err;
        console.log(chalk.green("done writing file!"));
      }
    );
  }// end writeHexGrid() function
  
