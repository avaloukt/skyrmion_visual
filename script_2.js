$( document ).ready(function() {

// right rotation transition for one rect
// d3.select("#stage")
//   .append('rect')
//   .attr('id',"centerElement")
//   .attr('height', 10)
//   .attr('width', 3)
//   .attr('fill', 'red')
//   .attr("transform","translate(75,75)")
//   .on("click", function(){
//     d3.select("#centerElement").transition().duration(2500)
//       .attr("transform","translate(75, 75) rotate(45)");
//   }

//   );

allRects = d3.select("#stage").selectAll('rect')

console.log(d3.range( 5*5 ))

//Bind x,y data for all rect
 var x_data = [25, 50, 75, 100, 125,
               25, 50, 75, 100, 125,
               25, 50, 75, 100, 125,
               25, 50, 75, 100, 125,
               25, 50, 75, 100, 125];

 var y_data = [25, 25, 25, 25, 25,
               50, 50, 50, 50, 50,
               75, 75, 75, 75, 75,
               100, 100, 100, 100, 100,
               125, 125, 125, 125, 125];

 var initialTranslateData = _.map(_.zip(x_data, y_data), function(i){
    return {x: i[0], y: i[1]}
 })

allRects.data(initialTranslateData)
    .enter().append('rect')
    .attr("transform", initialTranslate)
    .attr("width", 3)
    .attr("height", 10)
    .style("fill", "red")
    .on("click", function(d){
       d3.select(this).transition().duration(2500)
       .attr("transform","translate("+ d.x +","+ d.y+") rotate(45)");
    });

function initialTranslate(d){
  return "translate("+ d.x +","+ d.y+")";
}



});
    
    



