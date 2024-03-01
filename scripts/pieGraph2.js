// Sample data for the pie chart
const data2 = [
    { label: 'Wins', value: 20 },
    { label: 'Losses', value: 30 },
];

// Set up dimensions for the pie chart
const width2 = document.getElementById('pie-2').offsetWidth;
const height2 = document.getElementById('pie-2').offsetHeight;
const radius2 = Math.min(width2, height2) / 2;

// Create SVG element
var pieGraph2 = d3.select('#pie-2')
    .append('svg')
    .attr('width', width2)
    .attr('height', height2)
    .append('g')
    .attr('transform', `translate(${width2 / 2}, ${height2 / 2})`);

// Create a pie generator
var pie2 = d3.pie()
    .value(d => d.value);

// Generate pie chart data
const pieData2 = pie2(data2);

// Set up arc generator
const arc2 = d3.arc()
    .innerRadius(0)
    .outerRadius(radius2);

// Create arcs for each pie slice
const arcs2 = pieGraph2.selectAll('arc')
    .data(pieData2)
    .enter()
    .append('g')
    .attr('class', 'arc');

const colours = ["green", "red"]

// Add paths for each arc
arcs2.append('path')
    .attr('d', arc2)
    .attr('fill', (d, i) => colours[i]);

// Add text labels for each slice
arcs2.append('text')
    .attr('transform', d => `translate(${arc2.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text(d => d.data.label);