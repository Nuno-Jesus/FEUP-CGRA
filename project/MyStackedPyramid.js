import { CGFobject } from '../lib/CGF.js';

/**
* MyStackedPyramid
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyStackedPyramid extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  }
  
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    var ang = 0;
    var alphaAng = 2*Math.PI/this.slices;
    var stackHeightIncrement = 1 / this.stacks;
    var stackHeight = 0;

    for(var i = 0; i < this.stacks; i++){
      for(var k = 0; k < this.slices; k++){
        // All vertices have to be declared for a given face
        // even if they are shared with others, as the normals 
        // in each face will be different
  
        var sa = (1 - i * stackHeightIncrement) * Math.sin(ang);
        var saa = (1 - i * stackHeightIncrement) * Math.sin(ang+alphaAng);
        var ca = (1 - i * stackHeightIncrement) * Math.cos(ang);
        var caa = (1 - i * stackHeightIncrement) * Math.cos(ang+alphaAng);

        var sa2 = (1 - (i + 1) * stackHeightIncrement) * Math.sin(ang);
        var saa2 = (1 - (i + 1) * stackHeightIncrement) * Math.sin(ang+alphaAng);
        var ca2 = (1 - (i + 1) * stackHeightIncrement) * Math.cos(ang);
        var caa2 = (1 - (i + 1) * stackHeightIncrement) * Math.cos(ang+alphaAng);

        //Lower line of the stack
        this.vertices.push(ca, stackHeight, -sa);
        this.vertices.push(caa, stackHeight, -saa);
        
        //Upper line of the stack
        this.vertices.push(ca2, stackHeight + stackHeightIncrement, -sa2);
        this.vertices.push(caa2, stackHeight + stackHeightIncrement, -saa2);

  
        // triangle normal computed by cross product of two edges
        var normal = [
          saa-sa,
          ca*saa-sa*caa,
          caa-ca
        ];
  
        // normalization
        var nsize = Math.sqrt(
          normal[0]*normal[0]+
          normal[1]*normal[1]+
          normal[2]*normal[2]
        );
        
        normal[0]/=nsize;
        normal[1]/=nsize;
        normal[2]/=nsize;

        // push normal once for each vertex of this triangle
        this.normals.push(...normal);
        this.normals.push(...normal);
        this.normals.push(...normal);
  
        this.indices.push(16*i + 4*k, 16*i + 4*k + 1, 16*i + 4*k + 2);
        this.indices.push(16*i + 4*k + 3, 16*i + 4*k + 2, 16*i + 4*k + 1);
  
        ang += alphaAng;
      }
      
      stackHeight += stackHeightIncrement;
      ang = 0;
    }
    

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */
  updateBuffers(complexity){
    this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }
}

