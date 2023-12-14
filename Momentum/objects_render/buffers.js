//plane.vertices;  // from objects_logic/plane.js
//cube.vertices;   // from objects_logic/cube.js 
//block.vertices;  // from objects_logic/block.js

function buffers(gl,program,object){   
  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var colorAttributeLocation    = gl.getAttribLocation(program, "a_color");
  
  // Create a buffer and put three 2d clip space points in it
  var positionBuffer = gl.createBuffer();
  var colorBuffer    = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.enable(gl.DEPTH_TEST);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); 
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer); 
  // Attach vertices data to array buffer
  if (object=="plane") gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(plane.vertices), gl.STATIC_DRAW);
  if (object=="cube")  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.vertices) , gl.STATIC_DRAW);
  if (object=="block") gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(block.vertices), gl.STATIC_DRAW);
  // Create a vertex array object (attribute state)
  var vao = gl.createVertexArray();
  // and make it the one we're currently working with
  gl.bindVertexArray(vao);
  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);
  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
                          //in which buffer          //size  //type    //normalize //size  //offset
  gl.vertexAttribPointer( positionAttributeLocation, 3      ,gl.FLOAT, false     , 6*4   , 0);
  gl.enableVertexAttribArray(0); // layout 0 in vertex shader
  gl.vertexAttribPointer( colorAttributeLocation,    3      ,gl.FLOAT, false     , 6*4   , 3*4);
  gl.enableVertexAttribArray(1); // layout 1 in vertex shader    
    
  return vao;
}
