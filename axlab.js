var dataP = d3.json("gradeData.json.txt")

dataP.then(function(data){
  console.log("data",data);
  drawGraph(data,600,400,"#svg1");
  drawGraph(data,800,400,"#svg2");
  drawGraph(data,1000,400,"#svg3");
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
                 .range([margins.left,(width-margins.right)]);

  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([margins.top,height-margins.top]);

  var colors = d3.scaleOrdinal(d3.schemeAccent);

  var plotLand = svg.append("g")
                    .classed("plot",true);

  var students = plotLand.selectAll("g")
                         .data(data)
                         .enter()
                         .append("g")
                         .attr("fill",function(d){return colors(d.name)});

  students.selectAll("circle")
          .data(function(d){return d.grades})
          .enter()
          .append("circle")
          .attr("cx", function(d,i){return xScale(i)})
          .attr("cy", function(d){return yScale(d)})
          .attr("r",5);

}
