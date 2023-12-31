var block ={}

block.vertices = [
    //x    //y    //z       //r  //g  //b
    -0.33, -0.025, -0.025,  0.9, 0.9, 0.9,
    +0.33, -0.025, -0.025,  0.9, 0.9, 0.9,
    +0.33, +0.025, -0.025,  0.9, 0.9, 0.9,
    +0.33, +0.025, -0.025,  0.9, 0.9, 0.9,
    -0.33, +0.025, -0.025,  0.9, 0.9, 0.9,
    -0.33, -0.025, -0.025,  0.9, 0.9, 0.9,

    -0.33, -0.025, +0.025,  0.9, 0.9, 0.9,
    +0.33, -0.025, +0.025,  0.9, 0.9, 0.9,
    +0.33, +0.025, +0.025,  0.9, 0.9, 0.9, 
    +0.33, +0.025, +0.025,  0.9, 0.9, 0.9,
    -0.33, +0.025, +0.025,  0.9, 0.9, 0.9, 
    -0.33, -0.025, +0.025,  0.9, 0.9, 0.9,

    -0.33, +0.025, +0.025,  0.9, 0.9, 0.9,
    -0.33, +0.025, -0.025,  0.9, 0.9, 0.9, 
    -0.33, -0.025, -0.025,  0.9, 0.9, 0.9,
    -0.33, -0.025, -0.025,  0.9, 0.9, 0.9,
    -0.33, -0.025, +0.025,  0.9, 0.9, 0.9,
    -0.33, +0.025, +0.025,  0.9, 0.9, 0.9,

    +0.33, +0.025, +0.025,  0.9, 0.9, 0.9,
    +0.33, +0.025, -0.025,  0.9, 0.9, 0.9,
    +0.33, -0.025, -0.025,  0.9, 0.9, 0.9,
    +0.33, -0.025, -0.025,  0.9, 0.9, 0.9,
    +0.33, -0.025, +0.025,  0.9, 0.9, 0.9,
    +0.33, +0.025, +0.025,  0.9, 0.9, 0.9,

    -0.33, -0.025, -0.025,  0.9, 0.9, 0.9,
    +0.33, -0.025, -0.025,  0.9, 0.9, 0.9,
    +0.33, -0.025, +0.025,  0.9, 0.9, 0.9,
    +0.33, -0.025, +0.025,  0.9, 0.9, 0.9,
    -0.33, -0.025, +0.025,  0.9, 0.9, 0.9,
    -0.33, -0.025, -0.025,  0.9, 0.9, 0.9,

    -0.33, +0.025, -0.025,  0.9, 0.9, 0.9,
    +0.33, +0.025, -0.025,  0.9, 0.9, 0.9,
    +0.33, +0.025, +0.025,  0.9, 0.9, 0.9,
    +0.33, +0.025, +0.025,  0.9, 0.9, 0.9,
    -0.33, +0.025, +0.025,  0.9, 0.9, 0.9,
    -0.33, +0.025, -0.025,  0.9, 0.9, 0.9
]; 
block.vertices_back = [...block.vertices];

block.mass = 3.0;
