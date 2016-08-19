$( document ).ready(function() {

var rect = d3.selectAll("rect");
rect.style("fill", "red");

// rect.data([4, 4, 4, 4, 4, 
// 	          4, 2, 2, 2, 4,
//            4, 2, 1, 2, 4,
//            4, 2, 2, 2, 4,
//            4, 4, 4, 4, 4]);

// rect.attr('height', function(d) {
//   return d;
// });

// rect.attr('width', function(d) {
//   return d;
// });

 //select and filter elements with attribute
 var all_elements = [];
 all_elements = $('.spinner');

 var rect_selection = []; 

 var center_element = $('#0');
 //console.log(center_element.attr('x'), center_element.attr('y'))

 center_element_x_integer = parseInt(center_element.attr('x'));
 center_element_y_integer = parseInt(center_element.attr('y'));

 
 //Select 3x3 array elements around center
 // for (var i = 0; i < all_elements.length; i++) {
 //  if ( parseInt ($(all_elements[i]).attr('x')) < (parseInt(center_element.attr('x'))+26) &&
 //       parseInt ($(all_elements[i]).attr('x')) > (parseInt(center_element.attr('x'))-26) && 
 //       parseInt ($(all_elements[i]).attr('y')) < (parseInt(center_element.attr('y'))+26) &&
 //       parseInt ($(all_elements[i]).attr('y')) > (parseInt(center_element.attr('y'))-26)
 //     ) { 
	//   	rect_selection.push(all_elements[i]); 
	//   	//console.log( $(all_elements[i]).attr('id') )
	//   	} 
 // }

 //Select 3x3 array elements around center with d3 selection
 var subselection = d3.selectAll("rect").filter(
 	function(d){ 
 	  return d3.select(this).attr('x') < (center_element_x_integer + 26) &&
             d3.select(this).attr('x') > (center_element_x_integer - 26) &&
             d3.select(this).attr('y') < (center_element_y_integer + 26) &&
             d3.select(this).attr('y') > (center_element_y_integer - 26) ; 
 	}
 );

 subselection.style("fill", "blue"); 

 // // Filter selected rects by their binded data values
 //    svg.selectAll("rect")
 //        .data(data)
 //      //.enter().append("circle")
 //      .filter(function(d) { return d.close < 400 })
 //        .style("fill", "red")
 //        .attr("r", 3.5)
 //        .attr("cx", function(d) { return x(d.date); })
 //        .attr("cy", function(d) { return y(d.close); });

  //Bind alter height data
 var heights_data = [10, 10, 10,
                     10, 2, 10,
                     10, 10, 10];

 // subselection.attr('height', function(d) { return d; });

 //-> Bind Double array data for height and rotation
 var rotations_data = [-45, 0, 45,
	                    90, -45, 90,
	                    45, 0, -45];

 var transformations = _.map(_.zip(heights_data, rotations_data), function(i){
    return {height: i[0], rotation: i[1]}
 })
 console.log(transformations)


 subselection.data(transformations).attr("transform", vortexAnimation);

 function vortexAnimation(d) {
  //this.parentNode.appendChild(this);

  d3.select(this)
    .style("pointer-events", "none")
    .transition()
      .duration(1500)
      .attr("height",  d.height  )
      .attr("transform", "rotate(" + d.rotation + ")");
}




















});
    
    



