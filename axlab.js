var dataP = d3.json("gradeData.json.txt")

dataP.then(function(data){
  console.log("data",data);
  drawGraph(data,200,200,"#svg1");
  drawGraph(data,400,400,"#svg2");
  drawGraph(data,600,600,"#svg3");
},
function(err){
  console.log(err);
});

var drawGraph = function(data,width,height,idName){
  // var width = width;
  // var height = height;
  var svg = d3.select(idName)
              .attr("width",width)
              .attr("height",height);

  var xScale = d3.scaleLinear()
                 .domain([0,20])
                 .range([0,width]);

  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([0,height]);

  var plotLand = svg.append("g")
                    .classed("plot",true);

  var students = plotLand.selectAll("g")
                         .data(data)
                         .enter()
                         .append("g");

  students.selectAll("circle")
          .data(function(d){return d.grades})
          .enter()
          .append("circle")
          .attr("cx", function(d,i){return xScale(i)})
          .attr("cy", function(d){return yScale(d)})
          .attr("r",10);

}
