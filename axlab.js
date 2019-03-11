var dataP = d3.json("gradeData.json.txt")

var colors = d3.scaleOrdinal(d3.schemeAccent);

dataP.then(function(data){
  console.log("data",data);
  drawGraph(data,600,400,"#svg1");
  drawGraph(data,800,450,"#svg2");
  drawGraph(data,1000,500,"#svg3");
  drawLegend(data, "#svg1Key");
  drawLegend(data, "#svg2Key");
  drawLegend(data, "#svg3Key");
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
                 .range([height-margins.top,margins.top]);

  // var colors = d3.scaleOrdinal(d3.schemeAccent);

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

  var xAxis = d3.axisBottom()
                .scale(xScale);

  svg.append("g")
     .attr("transform","translate(0," + (height - 20) + ")")
     .call(xAxis);

   svg.append("text")
         .attr("transform","translate(" + (newWidth/2) + " ," + (height) + ")")
         .text("Exam Number");



  var yAxis = d3.axisLeft()
    .scale(yScale);

 svg.append("g")
  .attr("class","axis")
  .attr("transform","translate(" + (20) + ", 0)")
  .call(yAxis);

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 + margins.left)
    .attr("x",0 - ((newHeight/ 2) + 40))
    .text("Grade");
}

var drawLegend = function(data, idname)
{
  var width = 200;
  var height = 200;
  var boxWidth = 15;
  var svg = d3.select(idname)
              .attr("height", height)
              .attr("width", width);
  svg.selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("x", function(d,i)
      { return 25;})
    .attr("y", function (d, i)
      { return (i+1)*15 + 10;})
    .attr("width", boxWidth)
    .attr("height", boxWidth-3)
    .attr("fill", function(d)
      { return colors(d.name);})

svg.selectAll("text")
   .data(data)
   .enter()
   .append("text")
   .text(function(d)
      { return d.name;})
   .attr("x", function(d,i)
      { return 45})
   .attr("y", function(d, i)
      { return (i+1)*15 + 22;})
   .attr("fill", "black")
}
