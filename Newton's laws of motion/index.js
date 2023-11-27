"use strict";

var canvas, gl, vertexShader, fragmentShader, program, vao_plane, vao_cube, vao_force;
function main() {
  // Get A WebGL context
  canvas = document.querySelector("canvas");
  gl = canvas.getContext("webgl2");
  if (!gl) {
    console.log("webgl2 context not available");
    return;
  }

  // create GLSL shaders, upload the GLSL source, compile the shaders, create program, attach buffers
  vertexShader   = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);     //from objects_render/shader.js
  fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource); //from objects_render/shader.js
  // link the two shaders into a program
  program = createProgram(gl, vertexShader, fragmentShader); //from objects_render/program.js
  // load and attach buffers 
  vao_plane = buffers(gl,program, "plane"); //from objects_render/buffer.js
  vao_cube  = buffers(gl,program, "cube");  //from objects_render/buffer.js
  vao_force = buffers(gl,program, "force"); //from objects_render/buffer.js
  
  render();
}
main();

function render(){
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  // clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  gl.useProgram(program);
  
  // adapt objects matrices for view
  var uni_adapt = gl.getUniformLocation(program, "uni_adapt");
  var mat_adapt = glm.mat4(1.0);
  mat_adapt = glm.rotate(mat_adapt, Math.PI/3, glm.vec3(-1.0, 0, 0));
  mat_adapt = glm.translate(mat_adapt, glm.vec3(0, 5.0, -3.0));
  mat_adapt = glm.scale(mat_adapt, glm.vec3(2.75, 2.75, 2.75));
  gl.uniformMatrix4fv(uni_adapt, false, mat_adapt.array);
  var uni_perspective = gl.getUniformLocation(program, "uni_perspective");
  var mat_perspective = glm.perspective(glm.radians(60.0), 4.0 / 3.0, 0.1, 1000.0);
  gl.uniformMatrix4fv(uni_perspective, false, mat_perspective.array);
  
  // draw  
  gl.bindVertexArray(vao_plane);
  draw_triangles(6);
  gl.bindVertexArray(vao_cube);
  draw_triangles(36);
  gl.bindVertexArray(vao_force);
  draw_triangles(6);
}
//!need reduce draw functions to one
function draw_triangles(count_num){
   let primitiveType = gl.TRIANGLES;
   let offset = 0;
   let count = count_num;
   gl.drawArrays(primitiveType, offset, count);
}

var ui_plane_angle_button_left  = document.querySelector("#ui_plane_angle_button_left");
var ui_plane_angle_button_right = document.querySelector("#ui_plane_angle_button_right");
ui_plane_angle_button_left.addEventListener("click", ui_plane_angle_change);
ui_plane_angle_button_right.addEventListener("click", ui_plane_angle_change);
function ui_plane_angle_change(event){
   console.log(event.target.id);
   switch (event.target.id) {
      case "ui_plane_angle_button_left":
         //!why only 25, where acceleration of z?
         if(plane.angle>=-80){
	        plane.angle -= 5;
		 } 
		 break;
	  case "ui_plane_angle_button_right":
         if(plane.angle<=80){
	        plane.angle += 5;
		 } 
	  break;
   }
   plane.inclane();
   vao_plane = buffers(gl,program, "plane");
   vao_cube  = buffers(gl,program, "cube");
   vao_force = buffers(gl,program, "force");
   render();
}

var ui_force_angle_button_left  = document.querySelector("#ui_force_angle_button_left");
var ui_force_angle_button_right = document.querySelector("#ui_force_angle_button_right");
ui_force_angle_button_left.addEventListener("click", ui_force_angle_change);
ui_force_angle_button_right.addEventListener("click", ui_force_angle_change);
function ui_force_angle_change(event){
   	switch (event.target.id) {
      case "ui_force_angle_button_left":
         force.angle -= 5;
      break;
	  case "ui_force_angle_button_right":
         force.angle += 5;
   
	  break;
   }
   force.inclane();
   vao_force = buffers(gl,program, "force");
   render();
}

var ui_start_button = document.querySelector("#ui_start_button");
ui_start_button.addEventListener("click", ()=>{
   console.log("ui_start_buton")	
   if (!time.started) {
      time.started = true; 
      //get parameters
      cube.mass       = +document.querySelector("#mass")    .value; 
      plane.friction  = +document.querySelector("#friction").value; 
      force.magnitude = +document.querySelector("#force").value; 
      time.acceleration_coef = +document.querySelector("#acceleration_coef").value; 
      
      cube.build_physics(); //now we have acceleration x, y
      //start simulation
      time.interval = setInterval(()=>{
	
		  //shift to the delta and increase velocities
		  //x - horizontal application 
		  let delta_x = cube.init_velocity_x*1/24 + (1/2)*cube.acceleration_x*Math.pow((1/24),2); 
		  let final_velocity_x = cube.init_velocity_x + cube.acceleration_x/time.acceleration_coef*(1/24); 
		  cube.init_velocity_x = final_velocity_x;
          //y - vertical application if look from the left to the right(top view)		  
		  let delta_y = cube.init_velocity_y*1/24 + (1/2)*cube.acceleration_y*Math.pow((1/24),2); 
		  let final_velocity_y = cube.init_velocity_y + cube.acceleration_y/time.acceleration_coef*(1/24); 
		  cube.init_velocity_y = final_velocity_y;
		  //d = V(i)*t + a*(t^2)
		  //V(f) = V(i) + a*t/coef
		  //coef for make "slow-mo"
		
		  helper.move(cube.vertices_temp,delta_x ,delta_y); //move cube
		  cube.inclane();//move cube only in x,y and rotate(inclane) after, forces counted with inclane
		  vao_cube  = buffers(gl,program, "cube");
          render();
          
		  time.iter++;//count frames
	  },1000/24);   
   }
})
