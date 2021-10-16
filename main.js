import * as d3 from "d3";
import vegaEmbed from "vega-embed";

d3.select("#d3-div").append("p").text("hello from D3");

vegaEmbed("#vega-div", {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "A simple bar chart with embedded data.",
  data: {
    values: [
      { Date: "A", Price: 28 },
      { Date: "B", Price: 55 },
      { Date: "C", Price: 43 },
      { Date: "D", Price: 91 },
      { Date: "E", Price: 81 },
      { Date: "F", Price: 53 },
      { Date: "G", Price: 19 },
      { Date: "H", Price: 87 },
      { Date: "I", Price: 52 },
    ],
  },
  mark: "bar",
  encoding: {
    x: { field: "Date", type: "nominal", axis: { labelAngle: 0 } },
    y: { field: "Price", type: "quantitative" },
  },
});
