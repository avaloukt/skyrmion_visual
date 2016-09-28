$( document ).ready(function() {

allRects = d3.select("#stage").selectAll('rect')

//Rect initial width and height
var rect_width = 3;
var rect_height = 3;


//X,Y axes scales
var x_scale = [];
for(i=25;i<=4475;i+=25){
  x_scale.push(i);
}
//console.log(x_scale.length)

var y_scale = [];
for(i=25;i<=425;i+=25){
  y_scale.push(i);
}
//console.log(y_scale.length)


//X_DATA
var x_data = [];

for( j=0; j<y_scale.length; j++ ){
  for( i=0; i<x_scale.length; i++ ) {
    x_data.push(x_scale[i]);
  }
}
//console.log(x_data.length)

//Y_DATA
var y_data = [];

for( j=0; j<y_scale.length; j++ ){
  for( i=0; i<x_scale.length; i++ ) {
    y_data.push(y_scale[j]);
  }
}
//console.log(y_data.length)  //1225 should be 595

//INITIAL_ROATATION_DATA
 var initial_rotation_data = [];
 for(i=0; i<(x_scale.length * y_scale.length); i++) { initial_rotation_data.push(0);}
  //console.log(initial_rotation_data.length)

 //INITIAL_SCALE_DATA
 var initial_scale_y_data = [];
 for(i=0; i<(x_scale.length * y_scale.length); i++) { initial_scale_y_data.push(1);}
  //console.log(initial_scale_y_data.length)

 //IDs
 var ids = d3.range( x_scale.length * y_scale.length );


 var initialTranslateData = _.map(_.zip(x_data, y_data, ids, initial_rotation_data, initial_scale_y_data), function(i){
    return {x: i[0], y: i[1], id:i[2], rotation:i[3], scale_y: i[4]}
 })
 //console.log(initialTranslateData)


 var click_x, click_y, transform, x, y;

 var rotation_matrix = [0, 0, -15, -10, 0,  10, 15, 0, 0,
                         0,-45,-35,-20, 0,  20, 35, 45, 0,
                        -65,-55,-45,-30,0, 30, 45, 55, 65,
                        -75,-75,-70,-45,0, 45, 70, 75, 75,
                        -90,-90,-90,-90,0, 90,90,90,90,

                   -105,-105,-110,-135, -180, 135, 110, 105, 105,
                  -115,-125,-135,-150,  -180, 150, 135, 125, 115,
                    0,-135,-145,-160,   -180, 160, 145, 135, 0,
                     0,0, -165, -170,   -180, 170, 165, 0, 0
                      ];

  //Rotation matrix with both top and bottom elements turn upwards
 // var rotation_matrix = [0, 0, 165, 170, 0,  -170, -165, 0, 0,
 //                         0,135,145,160, 0,  -160, -145, -135, 0,
 //                        115,125,135,150,0, -150, -135, -125, -115,
 //                        105,105,110,135,0, -135, -110, -105, -105,
 //                        -90,-90,-90,-90,0, 90,90,90,90,

    //                     75,75,70,45,    0, -45, -70, -75, -75,
                        // 65,55,45,30,    0, -30, -45, -55, -65,
                        // 0,45,35,20,     0,  -20, -35, -45, 0,
                        // 0,0, 15, 10,    0,  -10, -15, 0, 0
 //                      ];

 var scale_y_matrix = [ 1, 1, 2, 3,    4,  3, 2, 1, 1,
                        1, 3, 6, 7,    7,  7, 6, 3, 1,
                        2, 6.5, 7, 7, 6.5, 7, 7, 6.5,2,
                        4, 6.5, 7, 5,  3,  5, 7, 6.5,4,
                        4, 7, 7, 3,    1,  3, 7, 7,  4,

                        4,6.5, 7, 5,   3,  5, 7, 6.5,4,
                        2,6.5,7,7,     6.5, 7, 7, 6.5,2,
                        1,3,6,7,        7,  7, 6, 3, 1,
                        1,1,2,3,        4,  3, 2, 1, 1
                      ];

 // var rotation_matrix = [-45, 0, 45,
 //                      -90, 0, 90,
 //                      -135, -180, 135];

 // var scale_y_matrix = [5, 5, 5,
 //                      5, 1, 5,
 //                      5, 5, 5];


 // var rotations = _.map(_.zip(rotation_matrix), function(i){
 //   return {rotation: i[0]}
 // })

//Initialisation
allRects.data(initialTranslateData)
    .enter().append('rect')
    .attr("transform", initialTranslate)
    .attr("width", rect_width)
    .attr("height", rect_height)
    .style("fill", "white")
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

        //*** Check if click in the desired area left&right - 4columns, top&bottom -4 rows to do animation
        if(d.x < 4400 && d.x > 100 && d.y > 100 && d.y < 350){

            //****Subselection of elements in matrix around clicked object
            var subselection = d3.select("#stage").selectAll("rect").filter(
                function(d){
                  //was 26
                  return d.x < (click_x + 101) &&
                          d.x > (click_x - 101) &&
                          d.y < (click_y + 101) &&
                          d.y > (click_y - 101) ;
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
        }

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
  return d3.select(this).attr('x') < (d.x + 101) &&
           d3.select(this).attr('x') > (d.x - 101) &&
           d3.select(this).attr('y') < (d.y + 101) &&
           d3.select(this).attr('y') > (d.y - 101) ;
}

function vortexAnimation(d) {
  var coord = this.getBBox();
  return  "translate("+ d.x +","+ d.y+") rotate("+ d.rotation+', '+ (coord.x+(coord.width/2)) +', '+ (coord.y+(coord.height/2))+") scale(1, "+ d.scale_y +")";
  //return  "translate("+ d.x +","+ d.y+") rotate("+ d.rotation +") scale(1, "+ d.scale_y +")";
}


});





