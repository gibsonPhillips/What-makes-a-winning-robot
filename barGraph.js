import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

console.log(d3);

var width = 500;
var height = 500;

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);