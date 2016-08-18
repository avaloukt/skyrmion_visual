$( document ).ready(function() {

console.log("in here")

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

 for (var i = 0; i < all_elements.length; i++) {

  if ( parseInt ($(all_elements[i]).attr('x')) < (parseInt(center_element.attr('x'))+26) &&
       parseInt ($(all_elements[i]).attr('x')) > (parseInt(center_element.attr('x'))-26) && 
       parseInt ($(all_elements[i]).attr('y')) < (parseInt(center_element.attr('y'))+26) &&
       parseInt ($(all_elements[i]).attr('y')) > (parseInt(center_element.attr('y'))-26)
     ) { 
	  	rect_selection.push(all_elements[i]); 

	  	console.log( $(all_elements[i]).attr('id') )
	  	} 
 }

});
    
    



