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

  var margins = {
    top:20,
    bottom: 20,
    left: 20,
    right: 20
  }

  var newWidth = width - margins.left - margins.right;
  var newHeight = height - margins.top - margins.bottom;
  var startWidth = margins.left + margins.right;
  var startHeight = margins.top + margins.bottom;

  var xScale = d3.scaleLinear()
                 .domain([0,20])
                 .range([startWidth,newWidth]);

  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([startHeight,newHeight]);

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
          .attr("r",5);

}
