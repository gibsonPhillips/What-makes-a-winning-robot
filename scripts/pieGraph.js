// Sample data for the pie chart
const data = [
    { label: 'Wins', value: 30 },
    { label: 'Losses', value: 20 },
];

// Set up dimensions for the pie chart
const width = 500;
const height = 500;
const radius = Math.min(width, height) / 2;

// Create SVG element
const svg = d3.select('#pie-chart-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

// Create a pie generator
const pie = d3.pie()
    .value(d => d.value);

// Generate pie chart data
const pieData = pie(data);

// Set up arc generator
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

// Create arcs for each pie slice
const arcs = svg.selectAll('arc')
    .data(pieData)
    .enter()
    .append('g')
    .attr('class', 'arc');


const colours = ["green", "red"]
// Add paths for each arc
arcs.append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => colours[i]);

// Add text labels for each slice
arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text(d => d.data.label);