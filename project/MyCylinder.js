import { CGFobject } from '../lib/CGF.js';

/**
 * MyCylinder
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of edges 
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices) {
		super(scene);
    this.slices = slices;
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
    this.texCoords = [];
    
    var sliceAngle = 2*Math.PI/this.slices;
		var sliceTextIncrement = 1/this.slices;
		
    for(var i = 0; i <= this.slices; i++){
			/**
			 * Each vertex of a prism's face is coincident with an unitary circle.
			 * That means, each compontent can be calculated this way:
			 * 
			 * 	-> x = r * cos("slice angle = index of the vertex * angle of the first slice");
			 * 	-> y = constante
			 *	-> z = r * sin("...")
			 */
			var x = Math.cos(i * sliceAngle);			
			var z = Math.sin(i * sliceAngle);

			//Push of both upper and lower faces vertex
			this.vertices.push(x, 0, -z);
			this.vertices.push(x, 1, -z);
			
			if (i !== 0){	
				this.indices.push(2*i, 2*i - 1, 2*i - 2);
				this.indices.push(2*i, 2*i + 1, 2*i - 1);
			}
			
			//Gourad's method: normal on the vertex will be equal to the coordinates of the vertex
			this.normals.push(x, 0, z);
			this.normals.push(x, 0, z);

			this.texCoords.push(i * sliceTextIncrement, 0);
			this.texCoords.push(i * sliceTextIncrement, 1);
    }
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateBuffers(complexity){
		this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}

