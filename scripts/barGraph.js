import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { processData, sortData } from "./csvReader.js";
console.log(d3);
var data1;
//console.log(data = await sortData(["Vertical Spinner","Drum"],["2WD","4WD"],["30lb","3lb"]));
// create 2 data_set

data1 = await processData();
console.log(data1);

// var data1 = await sortData(["Hammersaw"],["2WD", "Tread","4WD","Shuffler","8WD","Bristle Drive","Swerve","Drive"],["30lb","12lb","3lb"]);
// var data2 = await sortData(["Vertical Spinner"],["2WD", "Tread","4WD","Shuffler","8WD","Bristle Drive","Swerve","Drive"],["30lb","12lb","3lb"]);
// console.log(data1);
// console.log(data2);

//test data
// export var data1 = [
//   { group: "A", value: 4 },
//   { group: "B", value: 16 },
//   { group: "C", value: 8 },
//   { group: "D", value: 20 }
// ];

//Test data
export var data2 = [
  { group: "A", value: 7 },
  { group: "B", value: 1 },
  { group: "C", value: 20 },
  { group: "D", value: 3 }
];

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
  .domain(data1.map(function (d) { return d.Bot; }))
  .padding(0.2);
svg1.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickValues([]));

const yHeight = 80;
// Add Y axis
var y = d3.scaleLinear()
  .domain([0, yHeight])
  .range([height, 0]);
svg1.append("g")
  .attr("class", "myYaxis")
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
  .domain(data1.map(function (d) { return d.Bot; }))
  .padding(0.2);
svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x2).tickValues([]));

// Add Y axis
var y2 = d3.scaleLinear()
  .domain([0, yHeight])
  .range([height, 0]);
svg2.append("g")
  .attr("class", "myYaxis")
  .call(d3.axisLeft(y2));
var u;
var v;
// A function that create / update the plot for a given variable:
export function update(data) {

  // X axis
  x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(function (d) { return d.Bot; }))
    .padding(0.2);
  svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickValues([]));

  // X axis
  x2 = d3.scaleBand()
    .range([0, width])
    .domain(data.map(function (d) { return d.Bot; }))
    .padding(0.2);
  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x2).tickValues([]));

  u = svg1.selectAll("rect")
    .data(data);

  u
    .enter()
    .append("rect")
    .merge(u)
    .transition()
    .duration(1000)
    .attr("x", function (d) { return x(d.Bot); })
    .attr("y", function (d) { return y(d.W); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return height - y(d.W); })
    .attr("fill", "#69b3a2");

  v = svg2.selectAll("rect")
    .data(data);

  v
    .enter()
    .append("rect")
    .merge(v)
    .transition()
    .duration(1000)
    .attr("x", function (d) { return x2(d.Bot); })
    .attr("y", function (d) { return y2(d.W); })
    .attr("width", x2.bandwidth())
    .attr("height", function (d) { return height - y2(d.W); })
    .attr("fill", "#69b3a2");
}
window.update = update;
// Initialize the plot with the first dataset
update(data1);