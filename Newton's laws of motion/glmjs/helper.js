helper = {};
						  //vertices, angle, rotation axises
helper.inclane = function (v, a, x, y, z){
   let mat_rotate = glm.mat4(1.0);
   mat_rotate = glm.rotate(mat_rotate, a, glm.vec3(x, y, z));
   for (let i = 0; i < v.length; i+=6) {
	   let pos = glm.vec4(v[i],v[i+1],v[i+2],1.0);
	       pos=pos['*'](mat_rotate);
	   v[i]   = pos.x;
	   v[i+1] = pos.y;
	   v[i+2] = pos.z;
   }
}
					   //vertices, delta_x, delta_y
helper.move = function (v, dx, dy){
   let mat_translate = glm.mat4(1.0);
   
   mat_translate = glm.translate(mat_translate, glm.vec3( -dx , 0.0, 0.0));
   mat_translate = glm.translate(mat_translate, glm.vec3( 0.0 , dy , 0.0));
   //x, y - swapped, because
    for (let i = 0; i < v.length; i+=6) {
	   let pos = glm.vec4(v[i],v[i+1],v[i+2],1.0);
	       pos=pos['*'](mat_translate);
	   v[i]   = pos.x;
	   v[i+1] = pos.y;
	   v[i+2] = pos.z;
   }
}
