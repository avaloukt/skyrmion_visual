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

 var ids = d3.range( 5*5 );

 var initialTranslateData = _.map(_.zip(x_data, y_data, ids), function(i){
    return {x: i[0], y: i[1], id:i[2]}
 })
 console.log(initialTranslateData)

 //DEFINE CENTER ELEMENT CONSTANTS
 var center_element = $('#12');
 center_element_x_integer = parseInt(center_element.attr('x'));
 center_element_y_integer = parseInt(center_element.attr('y'));

  //Select 3x3 array elements around center with d3 selection
 var subselection = d3.selectAll("rect").filter(
  function(d){ 
    return d3.select(this).attr('x') < (center_element_x_integer + 26) &&
             d3.select(this).attr('x') > (center_element_x_integer - 26) &&
             d3.select(this).attr('y') < (center_element_y_integer + 26) &&
             d3.select(this).attr('y') > (center_element_y_integer - 26) ; 
  }
 );

allRects.data(initialTranslateData)
    .enter().append('rect')
    .attr("transform", initialTranslate)
    .attr("width", 3)
    .attr("height", 10)
    .style("fill", "red")    
    .on("click", function(d){
       //Rotation of the clicked element !!!
        d3.select(this).transition().duration(500)
        .attr("transform","translate("+ d.x +","+ d.y+") rotate(45)");

        var click_x = d.x;
        var click_y = d.y;
        console.log(click_x, click_y);
     
        // var subselection = d3.selectAll("rect").filter(
        //   function(d){ 
        //     return d3.select(this).attr('x') < (center_element_x_integer + 26) &&
        //              d3.select(this).attr('x') > (center_element_x_integer - 26) &&
        //              d3.select(this).attr('y') < (center_element_y_integer + 26) &&
        //              d3.select(this).attr('y') > (center_element_y_integer - 26) ; 
        //   }
        // );
        // subselection.style("fill", "blue"); 

    });

function initialTranslate(d){
  return "translate("+ d.x +","+ d.y+")";
}

function vortexArraySubSelection(d){ 
  console.log("vortexSubSelection")
  return d3.select(this).attr('x') < (d.x + 26) &&
           d3.select(this).attr('x') > (d.x - 26) &&
           d3.select(this).attr('y') < (d.y + 26) &&
           d3.select(this).attr('y') > (d.y - 26) ; 
}
 



});
    
    



