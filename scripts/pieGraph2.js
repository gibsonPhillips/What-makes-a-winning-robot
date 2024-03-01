import { sortData } from "./csvReader.js";

// Sample data for the pie chart
// const data = [
//     { label: 'Wins', value: 30 },
//     { label: 'Losses', value: 20 },
// ];

// Set up dimensions for the pie chart
var width = document.getElementById('pie-2').offsetWidth;
var height = document.getElementById('pie-2').offsetHeight;
var radius = Math.min(width, height) / 2;

var pieGraph1 = d3.select('#pie-2')
.append('svg')
.attr('width', width)
.attr('height', height)
.append('g')
.attr('transform', `translate(${width / 2}, ${height / 2})`);

export async function updatePie(weapon, drive, category) {

    pieGraph1.selectAll("arc").remove();


    var rawData = await sortData([weapon], drive, category);
    var data = [
        { label: 'Wins', value: rawData[weapon]["Summary"].W},
        { label: 'Losses', value: rawData[weapon]["Summary"].L},
    ];

    // Create a pie generator
    const pie = d3.pie()
        .value(d => d.value);

    // Generate pie chart data
    const pieData = pie(data);

    console.log(pieData);

    // Set up arc generator
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Create arcs for each pie slice
    const arcs = pieGraph1.selectAll('arc')
        .data(pieData)
        .enter()
        .append('g')
        .attr('class', 'arc');


    const colours = ["rgb(85,164,32)", "rgb(121,6,6)"];
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
}
window.updatePie2 = updatePie;
updatePie("Hammersaw", ["2WD", "Tread", "4WD", "Shuffler", "8WD", "Bristle Drive", "Swerve", "Drive"], ["30lb", "12lb", "3lb"])