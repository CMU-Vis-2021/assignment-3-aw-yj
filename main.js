
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

const tParser = d3.timeParse("%m/%d/%Y");
// get the data
d3.csv("tesla.csv", function(data) {

  // Group data by date. Note that we won't be able to query a date not in the csv.
  dataByDate = d3.group(data, d=>d.Date);
  // List of groups (here I have one group per column)
  var allGroup = {
    "Open": function(date){ return +dataByDate.get(date)[0].Open;}, 
    "High": function(date){ return +dataByDate.get(date)[0].High;}, 
    "Low": function(date){ return +dataByDate.get(date)[0].Low;}, 
    "Close": function(date){ return +dataByDate.get(date)[0].Close;}};

  console.log(allGroup);

  // add the options to the button
  d3.select("#selectButton")
    .selectAll('myOptions')
    .data(d3.keys(allGroup))
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button

    console.log(typeof d3.min(data, function(d) { return d.Open; }));
    console.log( tParser(d3.min(data, function(d) { return d.Date; })));
  // add the x Axis
  var x = d3.scaleUtc()
    .domain([d3.min(data, function(d) { return tParser(d.Date); }), d3.max(data, function(d) { return tParser(d.Date); })])
    .range([0, width]);
    
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  var y = d3.scaleLinear()
            .range([height, 0])
            .domain([d3.min(data, function(d) { return Number(d.Low); }), d3.max(data, function(d) { return Number(d.High); })]);
  svg.append("g")
      .call(d3.axisLeft(y));

  // Compute kernel density estimation for the first group called Setosa
  // var kde = kernelDensityEstimator(kernelEpanechnikov(3), x.ticks(140))
  // var density =  kde( allGroup["Open"]);
  var density =  dateLookup(data.map(function(d){return d.Date;}), tParser, allGroup, "Open");

  // Plot the area
  var curve = svg
    .append('g')
    .append("path")
      .attr("class", "mypath")
      .datum(density)
      //.attr("fill", "#69b3a2")
      .attr("opacity", ".8")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("stroke-linejoin", "round")
      .attr("d",  d3.line()
        .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
      );

  // A function that update the chart when slider is moved?
  function updateChart(selectedGroup) {
    // recompute density estimation
    var density =  dateLookup(data.map(function(d){return d.Date;}), tParser, allGroup, selectedGroup);

    // update the chart
    curve
      .datum(density)
      .transition()
      .duration(1000)
      .attr("d",  d3.line()
        .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
      );
  }

  // Listen to the slider?
  d3.select("#selectButton").on("change", function(d){
    selectedGroup = this.value
    updateChart(selectedGroup)
  })

});

// Function to compute density
function dateLookup(Dates, tParser, allGroup, selectedGroup) {
  return Dates.map(function(date) {
      return [tParser(date), allGroup[selectedGroup](date)];
    });
}

function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}
