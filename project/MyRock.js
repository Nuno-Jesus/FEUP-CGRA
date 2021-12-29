import { CGFobject, CGFappearance } from '../lib/CGF.js';

/**
 * MyRock
 * @method constructor
 * @param scene - MyScene object
 * @param slices - Number of vertical cuts in the rock
 * @param stacks - NUmber of horizontal cuts in the rock
 * @param colorizeRock - Boolean to know when to randomize the rock's color
 */
export class MyRock extends CGFobject {
  constructor(scene, slices, stacks, colorizeRock) {
    super(scene);
    this.scene = scene;
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.colorizeRock = colorizeRock;
    
    //Random scale parameters
    this.scaleX = Math.random() * 0.05 + 0.15;
    this.scaleY = Math.random() * 0.2;
    this.scaleZ = Math.random() * 0.05 + 0.15;

    //Random color parameters
    this.offsetR = Math.random();
    this.offsetG = Math.random();
    this.offsetB = Math.random();

    //Coordinates
    this.x = 0;
    this.y = 0;
    this.z = 0;

    //Random rotation
    this.rotationAngle = Math.random() * 2 * Math.PI/180.0;
    
    this.greyScale = Math.random() * 0.4 + 0.2;
    this.grey = new CGFappearance(scene);
    this.grey.setAmbient(0.3, 0.3, 0.3, 1.0);
    this.grey.setDiffuse(this.greyScale, this.greyScale, this.greyScale, 0);
    this.grey.setSpecular(1.0, 1.0, 1.0, 0);
    this.grey.setShininess(10.0);

    this.randomColor = new CGFappearance(scene);
    this.randomColor.setAmbient(0.3, 0.3, 0.3, 1.0);
    this.randomColor.setDiffuse(this.offsetR, this.offsetG, this.offsetB, 0);
    this.randomColor.setSpecular(1.0, 1.0, 1.0, 0);
    this.randomColor.setShininess(10.0);

    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    
    // create variables representing latitude and longitude and then increment variables which are dependable on the numb. of slices and stacks passed through the constructor
    var long = 0;
    var lat = 0;
    var latIncrement = 1/this.latDivs;    
    var longIncrement = 1/this.longDivs;

    var firstX;
    var firstY;
    var firstZ;
    
    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {      
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      long = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        var offset = Math.random() * 0.3;

        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;

        if(longitude === 0){
          firstX = x;
          firstY = y;
          firstZ = z;
        }
        
        /** In the last iteration, the last slice vertices will have to match the ones in the first slice 
         * otherwise, the rock will look broken (initial vertices not connected to the final ones)
        */
        else if(longitude === this.longDivs){
          x = firstX;
          y = firstY;
          z = firstZ;
        }

        else{
          x = x + offset * x;
          y = y + offset * y;
          z = z + offset * z;
        }
        
        this.vertices.push(x, y, z);

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push(current + 1, current, next);
          this.indices.push(current + 1, next, next + 1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vector
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
       this.texCoords.push(long, lat);
       long = long + longIncrement; // increments long value inside the correspondent for loop

      }
      phi += phiInc;
      lat = lat + latIncrement; // increments lat value inside the correspondent for loop
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();

    
  }
  
  displayRock(){
    this.scene.pushMatrix();

    if(this.colorizeRock)
      this.scene.scale(0.2, 0.1, 0.2);
    else
      this.scene.scale(this.scaleX, this.scaleY, this.scaleZ);

    this.scene.rotate(this.rotationAngle, 1, 1, 1);
    
    if(this.colorizeRock)
      this.randomColor.apply();
    else
      this.grey.apply();

    this.display();
    this.scene.popMatrix();
  }
}
