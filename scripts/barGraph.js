import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { processData, sortData } from "./csvReader.js";
console.log(d3);
var data;
//console.log(data = await sortData(["Vertical Spinner","Drum"],["2WD","4WD"],["30lb","3lb"]));
// create 2 data_set

data = await sortData(["Hammersaw",
  "Vertical Spinner",
  "Drum",
  "Undercutter",
  "Midcutter",
  "Grappler",
  "Flamethrower",
  "Drum Spinner",
  "Beater",
  "Hammer",
  "Full Body Spinner",
  "Flipper",
  "Shell Spinner",
  "Lifter",
  "Overhead",
  "MeltyBrain",
  "Horizontal Spinmer",
  "Crusher",
  "Thwack",
  "Ring Spinner",
  "Hammer Saw",
  "Flail"], ["2WD", "Tread", "4WD", "Shuffler", "8WD", "Bristle Drive", "Swerve", "Drive"], ["30lb", "12lb", "3lb"]);
console.log(data);

// var data = await sortData(["Hammersaw"],["2WD", "Tread","4WD","Shuffler","8WD","Bristle Drive","Swerve","Drive"],["30lb","12lb","3lb"]);
// var data2 = await sortData(["Vertical Spinner"],["2WD", "Tread","4WD","Shuffler","8WD","Bristle Drive","Swerve","Drive"],["30lb","12lb","3lb"]);
// console.log(data);
// console.log(data2);

//test data
// export var data = [
//   { group: "A", value: 4 },
//   { group: "B", value: 16 },
//   { group: "C", value: 8 },
//   { group: "D", value: 20 }
// ];

// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg1 object to the body of the page
var svg1 = d3.select("#barGraph1")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
  .range([0, width])
  .domain(Object.keys(data["Hammersaw"]))
  .padding(0.5);
var xAxis = svg1.append("g")
  .attr("class", "xAxis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickValues([]));

xAxis.select("path").remove();

var yHeight = findMax("Hammersaw", "Hammersaw") * 1.1;
// Add Y axis
var y = d3.scaleLinear()
  .domain([-yHeight, yHeight])
  .range([height, 0]);
var yAxis = svg1.append("g")
  .attr("class", "yAxis")
  .call(d3.axisLeft(y));

// append the svg1 object to the body of the page
var svg2 = d3.select("#barGraph2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x2 = d3.scaleBand()
  .range([0, width])
  .domain(Object.keys(data["Hammersaw"]))
  .padding(0.5);
var xAxis2 = svg2.append("g")
  .attr("class", "xAxis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x2).tickValues([]));

xAxis2.select("path").remove();

// Add Y axis
var y2 = d3.scaleLinear()
  .domain([-yHeight, yHeight])
  .range([height, 0]);
var yAxis2 = svg2.append("g")
  .attr("class", "yAxis")
  .call(d3.axisLeft(y2));

svg1.append('line')
  .style("stroke", "white")
  .style("stroke-width", 0.5)
  .attr("x1", 0)
  .attr("y1", y(0))
  .attr("x2", width)
  .attr("y2", y(0));
svg2.append('line')
  .style("stroke", "white")
  .style("stroke-width", 0.5)
  .attr("x1", 0)
  .attr("y1", y(0))
  .attr("x2", width)
  .attr("y2", y(0));

var u;
var v;
// A function that create / update the plot for a given variable:
export async function update(weapon1, weapon2, drive, category) {
  data = await sortData([weapon1, weapon2], drive, category);
  svg1.selectAll("rect").remove();
  svg2.selectAll("rect").remove();
  svg1.select(".xAxis").remove();
  svg2.select(".xAxis").remove();
  svg1.select(".yAxis").remove();
  svg2.select(".yAxis").remove();
  yHeight = findMax(weapon1, weapon2) * 1.1;

  var y = d3.scaleLinear()
    .domain([-yHeight, yHeight])
    .range([height, 0]);
  yAxis = svg1.append("g")
    .attr("class", "yAxis")
    .call(d3.axisLeft(y));

  var y2 = d3.scaleLinear()
    .domain([-yHeight, yHeight])
    .range([height, 0]);
  yAxis2 = svg2.append("g")
    .attr("class", "yAxis")
    .call(d3.axisLeft(y2));

  if (data[weapon1]) {
    // X axis
    x = d3.scaleBand()
      .range([0, width])
      .domain(Object.keys(data[weapon1]))
      .padding(0.5);
    xAxis = svg1.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    u = svg1.selectAll("rect")
      .data(Object.entries(data[weapon1]));

    //The Wins
    u
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d[0]); })
      .attr("y", function (d) { return y(d[1].W); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d[1].W - yHeight); })
      .attr("fill", "#69b3a2");

    //The losses
    u
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d[0]); })
      .attr("y", function (d) { return y(0); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d[1].L - yHeight); })
      .attr("fill", "#da845f");
  } else {
    // X axis
    x = d3.scaleBand()
      .range([0, width])
      .domain(["Summary"])
      .padding(0.5);
    xAxis = svg1.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  }

  if (data[weapon2]) {
    // X axis
    x2 = d3.scaleBand()
      .range([0, width])
      .domain(Object.keys(data[weapon2]))
      .padding(0.5);
    xAxis2 = svg2.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x2));

    v = svg2.selectAll("rect")
      .data(Object.entries(data[weapon2]));

    //The wins
    v
      .enter()
      .append("rect")
      .attr("x", function (d) { return x2(d[0]); })
      .attr("y", function (d) { return y2(d[1].W); })
      .attr("width", x2.bandwidth())
      .attr("height", function (d) { return height - y2(d[1].W - yHeight); })
      .attr("fill", "#69b3a2");

    //The losses
    v
      .enter()
      .append("rect")
      .attr("x", function (d) { return x2(d[0]); })
      .attr("y", function (d) { return y2(0); })
      .attr("width", x2.bandwidth())
      .attr("height", function (d) { return height - y(d[1].L - yHeight); })
      .attr("fill", "#da845f");
  }
  else {
    // X axis
    x2 = d3.scaleBand()
      .range([0, width])
      .domain(["Summary"])
      .padding(0.5);
    xAxis2 = svg2.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x2));
  }

  xAxis.select("path").remove();

  xAxis2.select("path").remove();
}
window.update = update;

function findMax(weapon1, weapon2) {
  console.log(data[weapon1]);
  var max = 1;
  if (data[weapon1]) {
    var weaponData1 = Object.entries(data[weapon1]);
    if (max < weaponData1[weaponData1.length - 1][1].W) {
      max = weaponData1[weaponData1.length - 1][1].W;
    }
    if (max < weaponData1[weaponData1.length - 1][1].L) {
      max = weaponData1[weaponData1.length - 1][1].L;
    }
  }
  if (data[weapon2]) {
    var weaponData2 = Object.entries(data[weapon2]);
    if (max < weaponData2[weaponData2.length - 1][1].W) {
      max = weaponData2[weaponData2.length - 1][1].W;
    }
    if (max < weaponData2[weaponData2.length - 1][1].L) {
      max = weaponData2[weaponData2.length - 1][1].L;
    }
  }
  return max;
}

// Initialize the plot with the first dataset
update("Hammersaw", "Hammersaw", ["2WD","Tread", "4WD", "Shuffler", "8WD", "Bristle Drive", "Swerve", "Drive"], ["30lb", "12lb", "3lb"]);