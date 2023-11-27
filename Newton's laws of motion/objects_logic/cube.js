var cube ={}

cube.vertices = [
    //x    //y    //z     //r  //g  //b
    -0.025, -0.025, -0.025,  1.0, 1.0, 1.0,
    +0.025, -0.025, -0.025,  1.0, 1.0, 1.0,
    +0.025, +0.025, -0.025,  1.0, 1.0, 1.0,
    +0.025, +0.025, -0.025,  1.0, 1.0, 1.0,
    -0.025, +0.025, -0.025,  1.0, 1.0, 1.0,
    -0.025, -0.025, -0.025,  1.0, 1.0, 1.0,

    -0.025, -0.025, +0.025,  1.0, 1.0, 1.0,
    +0.025, -0.025, +0.025,  1.0, 1.0, 1.0,
    +0.025, +0.025, +0.025,  1.0, 1.0, 1.0, 
    +0.025, +0.025, +0.025,  1.0, 1.0, 1.0,
    -0.025, +0.025, +0.025,  1.0, 1.0, 1.0, 
    -0.025, -0.025, +0.025,  1.0, 1.0, 1.0,

    -0.025, +0.025, +0.025,  1.0, 1.0, 1.0,
    -0.025, +0.025, -0.025,  1.0, 1.0, 1.0, 
    -0.025, -0.025, -0.025,  1.0, 1.0, 1.0,
    -0.025, -0.025, -0.025,  1.0, 1.0, 1.0,
    -0.025, -0.025, +0.025,  1.0, 1.0, 1.0,
    -0.025, +0.025, +0.025,  1.0, 1.0, 1.0,

    +0.025, +0.025, +0.025,  1.0, 1.0, 1.0,
    +0.025, +0.025, -0.025,  1.0, 1.0, 1.0,
    +0.025, -0.025, -0.025,  1.0, 1.0, 1.0,
    +0.025, -0.025, -0.025,  1.0, 1.0, 1.0,
    +0.025, -0.025, +0.025,  1.0, 1.0, 1.0,
    +0.025, +0.025, +0.025,  1.0, 1.0, 1.0,

    -0.025, -0.025, -0.025,  1.0, 1.0, 1.0,
    +0.025, -0.025, -0.025,  1.0, 1.0, 1.0,
    +0.025, -0.025, +0.025,  1.0, 1.0, 1.0,
    +0.025, -0.025, +0.025,  1.0, 1.0, 1.0,
    -0.025, -0.025, +0.025,  1.0, 1.0, 1.0,
    -0.025, -0.025, -0.025,  1.0, 1.0, 1.0,

    -0.025, +0.025, -0.025,  1.0, 1.0, 1.0,
    +0.025, +0.025, -0.025,  1.0, 1.0, 1.0,
    +0.025, +0.025, +0.025,  1.0, 1.0, 1.0,
    +0.025, +0.025, +0.025,  1.0, 1.0, 1.0,
    -0.025, +0.025, +0.025,  1.0, 1.0, 1.0,
    -0.025, +0.025, -0.025,  1.0, 1.0, 1.0
]; //size ~4x4x4cm, render from this vertices(with rotating)
cube.vertices_temp = [...cube.vertices]; //vertices for changing, x,y

cube.angle = 0; //degrees

cube.inclane = function() {
   cube.angle = plane.angle;
   cube.vertices=[...cube.vertices_temp]; //restore from temp and change to current angle
   helper.inclane(cube.vertices, cube.angle*Math.PI/180, 0, 1, 0);
}
cube.mass = 0.006; //kg default mass of matches's box
cube.build_physics = function() {
   //force of the object to the Earth F = m*g
   cube.force_gravity  = cube.mass*time.gravity_acceleration;
   //force of "sliding" with direction, F = F * sin(angle), horizontal application(from viewer), z-when rotated
   cube.force_slide = cube.force_gravity*Math.sin(Math.PI*plane.angle/180)*-1;
   //*right direction - positive force, left negative(for all forces)
   //opposite force of the friction
   cube.force_friction = plane.friction_coef*cube.force_gravity*(Math.sin(Math.PI*plane.angle/180)); 
   //horizontal application(from top of view) of setted in ui the force
   cube.force_x = force.magnitude*Math.cos(Math.PI*force.angle/180+Math.PI)*-1;
   cube.force_result = cube.force_slide + cube.force_friction + cube.force_x; 
   cube.acceleration_x = cube.force_result/ cube.mass; // from F = m*a
   cube.init_velocity_x = 0; // set start point
    
   //vertical(from top of view) application of setted in ui the force
   cube.force_y = force.magnitude*Math.sin(Math.PI*force.angle/180);
   cube.acceleration_y = cube.force_y/ cube.mass; // from F = m*a
   cube.init_velocity_y = 0; // set start point
   
   console.log("plane.angle:",plane.angle,"force.angle",force.angle,"cube.force_gravity:", cube.force_gravity,"cube.force_friction:",cube.force_friction);
   console.log("force.slide:",cube.force_slide,"force_x:",cube.force_x,"cube.acceleration_x:",cube.acceleration_x);
   console.log("cube.force_y:",cube.force_y,"cube.acceleration_y",cube.acceleration_y);
}
