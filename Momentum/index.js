"use strict";

var canvas, gl, vertexShader, fragmentShader, program, vao_plane, vao_cube, vao_block;
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
  vao_block = buffers(gl,program, "block"); //from objects_render/buffer.js
  
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
  gl.bindVertexArray(vao_block);
  draw_triangles(36);
}

function draw_triangles(count_num){
   let primitiveType = gl.TRIANGLES;
   let offset = 0;
   let count = count_num;
   gl.drawArrays(primitiveType, offset, count);
}

var ui_cube_position_button_left  = document.querySelector("#ui_cube_position_button_left");
var ui_cube_position_button_right = document.querySelector("#ui_cube_position_button_right");
ui_cube_position_button_left .addEventListener("click", ui_cube_position_change);
ui_cube_position_button_right.addEventListener("click", ui_cube_position_change);
function ui_cube_position_change(event){
   console.log("ui_cube_position_change\n");
   switch (event.target.id) {
      case "ui_cube_position_button_left":
         cube.change_position(-0.05);
		 break;
	  case "ui_cube_position_button_right":
         cube.change_position( 0.05);
	  break;
   }
   vao_cube  = buffers(gl,program, "cube");
   render();
}

var ui_start_button = document.querySelector("#ui_start_button");
ui_start_button.addEventListener("click", ()=>{
   console.log("ui_start_buton")	
   if (!time.started) {
      time.started = true; 
      //get parameters
      cube.mass  = +document.querySelector("#cube_mass") .value; 
      cube.speed = +document.querySelector("#cube_speed").value;
      block.mass = +document.querySelector("#block_mass").value;
      plane.friction_coef = +document.querySelector("#friction_coef").value;
      console.log("input:\n", "cube.mass: ", cube.mass, "cube.speed: ", cube.speed, "block.mass: ", block.mass); 
	  
      //start simulation
      time.frame = 1000/24/cube.speed;
      time.interval = setInterval(time.callback,time.frame);   
   }
})
var ui_stop_button = document.querySelector("#ui_stop_button");
ui_stop_button.addEventListener("click", ()=>{clearInterval(time.interval)})
