var vertexShaderSource = `#version 300 es
layout (location = 0) in vec4 a_position;
layout (location = 1) in vec3 a_color;
uniform mat4 uni_perspective;
uniform mat4 uni_adapt;
out vec3 trans_color;

void main() {
  gl_Position = uni_perspective*uni_adapt*a_position;
  trans_color = a_color;
}
`;

var fragmentShaderSource = `#version 300 es
precision highp float;
in vec3 trans_color;
out vec4 outColor;
void main() {
  outColor =  vec4(trans_color,1.0);
}
`;

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    console.log(shader)
    return shader;
  }
  console.log("createShader failure: ", gl.getShaderInfoLog(shader)); 
  gl.deleteShader(shader);
  return undefined;
}

