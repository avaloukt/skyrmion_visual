 $( document ).ready(function() {

allRects = d3.select("#stage").selectAll('rect')

//Rect initial width and height
var rect_width = 2;
var rect_height = 2;

//Bind x,y data for all rects
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

 var initial_rotation_data = [0, 0, 0, 0, 0,
                       0, 0, 0, 0, 0,
                       0, 0, 0, 0, 0,
                       0, 0, 0, 0, 0,
                       0, 0, 0, 0, 0];

 var initial_scale_y_data = [1, 1, 1, 1, 1,
                       1, 1, 1, 1, 1,
                       1, 1, 1, 1, 1,
                       1, 1, 1, 1, 1,
                       1, 1, 1, 1, 1];

 var ids = d3.range( 5*5 );
 
 //Alter initail centering by width/2 and height/2
 //*** Need to FIX Rotattion Center
 //try initial x, y as it is just change rotation point
 //what's the trick with Bbox?

 // for(i=0; i < x_data.length; i++){
 //    x_data[i] = x_data[i] + (rect_width/2); 
 // }

 // for(i=0; i < y_data.length; i++){
 //    y_data[i] = y_data[i] + (rect_height/2); 
 // }

 var initialTranslateData = _.map(_.zip(x_data, y_data, ids, initial_rotation_data, initial_scale_y_data), function(i){
    return {x: i[0], y: i[1], id:i[2], rotation:i[3], scale_y: i[4]}
 })


 var click_x, click_y, transform, x, y;

 var rotation_matrix = [-45, 0, 45,
                      -90, 0, 90,
                      45, 0, -45];

 var scale_y_matrix = [5, 5, 5,
                      5, 1, 5,
                      5, 5, 5];

 // var rotations = _.map(_.zip(rotation_matrix), function(i){
 //   return {rotation: i[0]}
 // })

//Initialisation 
allRects.data(initialTranslateData)
    .enter().append('rect')
    .attr("transform", initialTranslate)
    .attr("width", rect_width)
    .attr("height", rect_height)
    .style("fill", "red")    
    .on("mouseover", function(d){
         
        // mouseover or click

         
        //*****Reset rotated elemenets
        //Subselection of elements already rotated
        var rotated_subselection = d3.select("#stage").selectAll("rect").filter(
            function(d){ 
              return (d.rotation != 0) || (d.scale_y != 1); 
            }
        );
        //Set d.rotation to 0  
        rotated_subselection.data().forEach(function(d){
          d.rotation = 0;  
          d.scale_y = 1;   
        });
        //Transition for all rects depending on their d.rotation
        d3.select("#stage").selectAll('rect').transition().duration(700).attr("transform",vortexAnimation);



        //***Get dx and dy of clicked element
        click_x = d.x;
        click_y = d.y;

        //****Subselection of elements in matrix around clicked object
        var subselection = d3.select("#stage").selectAll("rect").filter(
            function(d){ 
              //was 26
              return d.x < (click_x + 26) &&
                      d.x > (click_x - 26) &&
                      d.y < (click_y + 26) &&
                      d.y > (click_y - 26) ; 
            }
        );
        //Alter rotation data of subselection
        var i = 0;
        subselection.data().forEach(function(d){
          d.rotation = rotation_matrix[i];
          d.scale_y = scale_y_matrix[i]; 
          i++;
        });  
        //Transition for all rects depending on their d.rotation
        d3.select("#stage").selectAll('rect').transition().duration(700).attr("transform",vortexAnimation);

    });



function attachX(d){
  return d.x;
}

function attachY(d){
  return d.y;
}

function initialTranslate(d){
  return "translate("+ d.x +","+ d.y+")";
}

function vortexArraySubSelection(d){ 
  //console.log("vortexSubSelection")
  return d3.select(this).attr('x') < (d.x + 26) &&
           d3.select(this).attr('x') > (d.x - 26) &&
           d3.select(this).attr('y') < (d.y + 26) &&
           d3.select(this).attr('y') > (d.y - 26) ; 
}

function vortexAnimation(d) {
  //this.parentNode.appendChild(this);

    //d3.select(this).attr("height",  d.height);
    //calculate x origin and y origin for each of them
    //var id = d3.select(this).attr("id");
   // var x_o = +d.x +  (this.getBBox().width / 2); //(d3.select(this).attr("width")/2); // + 
    //var y_o= +d.y + (this.getBBox().height / 2); //(d3.select(this).attr("height")/2); //(
    //console.log("centers of rotation",x_o,y_o)

    console.log(this.getBBox());

    var coord = this.getBBox();
    

    return  "translate("+ d.x +","+ d.y+") rotate("+ d.rotation+', '+ (coord.x+(coord.width/2)) +', '+ (coord.y+(coord.height/2))+") scale(1.5, "+ d.scale_y +")";
    




    //return  "translate("+x_o+","+y_o+") rotate("+d.rotation+") translate("+ -x_o+","+ - y_o+")";
    
   //  d3.select(this)
   // // .style("pointer-events", "none")
   //  .transition()
   //    .duration(1500)
   //    .attr("transform", 
   //          "rotate(" + d.rotation + "," +
   //          ( d3.select(this).attr("x") + d3.select(this).attr('width')/2 )+ "," +
   //          ( d3.select(this).attr('y') + d3.select(this).attr('height')/2 )+")")
   //    .attr("height",  d.height); 
} 




 //Rotation of the clicked element !!!
 // d3.select(this).transition().duration(500)
 // .attr("transform","translate("+ d.x +","+ d.y+") rotate(45)");

 //right rotation transition for one rect
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

  //console.log(initialTranslateData)

 //DEFINE CENTER ELEMENT CONSTANTS
 // var center_element = $('#12');
 // center_element_x_integer = parseInt(center_element.attr('x'));
 // center_element_y_integer = parseInt(center_element.attr('y'));

  //Select 3x3 array elements around center with d3 selection
  //var subselection = d3.selectAll("rect").filter(
 //  function(d){ 
 //    return d3.select(this).attr('x') < (center_element_x_integer + 26) &&
 //             d3.select(this).attr('x') > (center_element_x_integer - 26) &&
 //             d3.select(this).attr('y') < (center_element_y_integer + 26) &&
 //             d3.select(this).attr('y') > (center_element_y_integer - 26) ; 
 //  }
 // );


});
    
    



