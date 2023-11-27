var plane ={}

plane.vertices = [
    //x    //y    //z   //r  //g  //b
    -10.0, -10.0, -0.025, 0.8, 0.8, 0.8,
    -10.0, +10.0, -0.025, 0.8, 0.8, 0.8,
    +10.0, +10.0, -0.025, 0.8, 0.8, 0.8,
    +10.0, +10.0, -0.025, 0.8, 0.8, 0.8,
    +10.0, -10.0, -0.025, 0.8, 0.8, 0.8,
    -10.0, -10.0, -0.025, 0.8, 0.8, 0.8,
];//size of plane = ~1.22m x 1.22m - vertices for render
plane.vertices_back = [...plane.vertices]; //here original vertices
plane.angle   = 0; //degrees
plane.inclane = function() {
   plane.vertices=[...plane.vertices_back]; //restore from orig and change to the current angle
   helper.inclane(plane.vertices, plane.angle*Math.PI/180, 0, 1, 0);
   cube.inclane(); //cube depend on plane, inclane cube also
   force.inclane();
}
plane.friction_coef = 0.28;//coef default for paper
