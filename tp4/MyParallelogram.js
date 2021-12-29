import {CGFobject} from '../lib/CGF.js';
/**
 * MyParellelogram
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyParallelogram extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 0, 0,	//1
			2, 0, 0,    //2
			3, 1, 0, 	//3
			2, 1, 0,	//4
			1, 1, 0,	//5
			
			0, 0, 0,	//6
			1, 0, 0,	//7
			2, 0, 0,    //8
			3, 1, 0, 	//9
			2, 1, 0,	//10
			1, 1, 0		//11 
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			// face 1 //
			0, 1, 5,
			1, 2, 5,
			2, 4, 5,
			3, 4, 2,
			
			// face 2 //
			6, 11, 7,
			7, 11, 8,
			8, 11, 10,
			9, 8, 10
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			//
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		this.texCoords = [
			0.25, 0.75,
            0.5, 0.75,
            0.75, 0.75,
            1, 1,
            0.75, 1,
            0.5, 1,

			0.25, 0.75,
            0.5, 0.75,
            0.75, 0.75,
            1, 1,
            0.75, 1,
            0.5, 1
		];
		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	 updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}