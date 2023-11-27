var force ={}

force.vertices = [
     //x    //y    //z    //r  //g  //b
    -0.75, -0.01, -0.005, 0.0, 0.0, 0.8, 
    -0.75, +0.01, -0.005, 0.0, 0.0, 0.8,
    +0.00, +0.01, -0.005, 0.0, 0.0, 0.8,
    +0.00, +0.01, -0.005, 0.0, 0.0, 0.8,
    +0.00, -0.01, -0.005, 0.0, 0.0, 0.8,
    -0.75, -0.01, -0.005, 0.0, 0.0, 0.8,
]; //line - vertices for render
force.vertices_back = [...force.vertices]; //store orig vertices
force.angle = 0; //degrees
force.magnitude = 1; //newtons
force.inclane = function() {
   force.vertices=[...force.vertices_back]; //restore from orig and change to the current angle
   helper.inclane(force.vertices, force.angle*Math.PI/180, 0, 0, 1);
   helper.inclane(force.vertices, plane.angle*Math.PI/180, 0, 1, 0);
}
