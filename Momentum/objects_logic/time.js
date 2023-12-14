var time ={}
time.started  = false;
time.finished = false; 
time.iter = 0;
time.interval = undefined;
time.frame = 1000/24/1;

time.collision_checker = 0; // 0 - not started, 1 - calc, 2 - was started and calculated
time.callback = function() {
   //console.log(time.iter)
   time.iter++;//count frames
   
   //if collision not started
   if(time.collision_checker == 0){
      helper.move(cube.vertices, 0, -1*cube.speed/24/cube.speed); //speed devided by frame, and with dependency to speed
      time.collision_check();
   } else {
	  //collision started, calculate
	  if(time.collision_checker == 1){
         time.collision_calculate();
         time.collision_checker = 2;
         block.position = 0.0; //need for render rotating
	  }
	  //collision started, calculated, continue
	  if(time.collision_checker == 2){
		//calc delta of the move
		let delta_cube           = (-1*Math.pow(cube.speed_current,2))/(2*cube.acceleration);
		let delta_block_general  = (-1*Math.pow(block.speed_current_general,2))/(2*block.acceleration);
		let delta_block_rotating = (-1*Math.pow(block.speed_current_rotating/(block.width/2),2))/(2*block.acceleration);
		//move
		helper.move(cube.vertices , 0, -1*delta_cube/time.frame);
		block.position += delta_block_general/time.frame; 
		if (cube.position > 0) helper.rotate(block.vertices_back, delta_block_rotating/time.frame, 0, 0,  1);
		if (cube.position < 0) helper.rotate(block.vertices_back, delta_block_rotating/time.frame, 0, 0, -1);
		block.vertices = [...block.vertices_back];
		helper.move(block.vertices , 0, block.position); 
		//recalc current speed
		cube.speed_current           += cube.acceleration /time.frame;
		block.speed_current_general  -= block.acceleration/time.frame;
		block.speed_current_rotating -= block.acceleration/time.frame;
		
		if (cube.speed_current  > 0) cube.speed_current = 0;
		if (block.speed_current_general  < 0) block.speed_current_general = 0;
		if (block.speed_current_rotating < 0) block.speed_current_rotating = 0;
		if (cube.speed_current == 0 && block.speed_current_general == 0 && block.speed_current_rotating == 0) clearInterval(time.interval); 
		console.log(block.speed_current_rotating);
      }
   }
   
   vao_cube  = buffers(gl,program, "cube");
   vao_block = buffers(gl,program, "block");
   render();	  
}
time.collision_check = function() {
   let cube_front  = helper.find_front(cube .vertices,"-");
   let block_front = helper.find_front(block.vertices,"+");
                                        ////speed devided by frame, and with dependency to speed
   if(Math.abs(block_front-cube_front)<=cube.speed/24/cube.speed){
      time.collision_checker = 1;
   }
}

time.gravity_acceleration = 9.80665;
time.collision_calculate = function () {
	console.log("collision calculate");
	cube.speed_final    = cube.speed*(cube.mass-block.mass)/(cube.mass+block.mass);
	block.speed_final   = cube.speed*(1+((cube.mass-block.mass)/(cube.mass+block.mass)));
    console.log("cube.speed_final: " , cube.speed_final  , "block.speed_final: ", block.speed_final);

	block.width = helper.find_width(block.vertices);
	block.coef_to_rotating = Math.abs(cube.position)/(block.width/2);
	block.coef_to_general  = (block.width/2 - Math.abs(cube.position))/(block.width/2);
	console.log("block.coef_to_rotating: ", block.coef_to_rotating, "block.coef_to_general: ", block.coef_to_general);
	cube.speed_current = cube.speed_final;
	block.speed_current_rotating = block.speed_final*block.coef_to_rotating;
	block.speed_current_general  = block.speed_final*block.coef_to_general;
	console.log("cube.speed_current:", cube.speed_current, "block.speed_current_rotating: ", block.speed_current_rotating, "block.speed_current_general: ", block.speed_current_general);
	
	cube.friction_force  = plane.friction_coef*cube .mass*time.gravity_acceleration;
	block.friction_force = plane.friction_coef*block.mass*time.gravity_acceleration;
	cube.acceleration  = cube.friction_force/cube .mass;
	block.acceleration = block.friction_force/block.mass;
	console.log("cube.friction_force: " , cube.friction_force , "cube.acceleration :" , cube.acceleration);
	console.log("block.friction_force: ", block.friction_force, "block.acceleration :", block.acceleration);
}
