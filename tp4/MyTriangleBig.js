import {CGFobject} from '../lib/CGF.js';

/**
 * MyTriangleBig
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */

export class MyTriangleBig extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-2, 0, 0,	//0
			-1, 1, 0,	//1
			-1, 0, 0,	//2
			0, 2, 0,	//3
			0, 1, 0,  //4
			0, 0, 0,  //5
			1, 1, 0,  //6
			1, 0, 0,  //7
			2, 0, 0   //8
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1, 0, 2,
			1, 2, 5,
			1, 5, 4,
			1, 4, 3,
			6, 3, 4,
			6, 4, 5,
			6, 5, 7,
			6, 7, 8
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.texCoords = [
			0, 0,
			0.25, 0.25,
			0.25, 0,
			0.5, 0.5,
			0.5, 0.25,
			0.5, 0,
			0.75, 0.25,
			0.75, 0,
			1, 0
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