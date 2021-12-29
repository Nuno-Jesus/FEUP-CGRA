import { CGFobject } from '../lib/CGF.js';

/**
 * MyTriangle
 * @method constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,		// 0
			0, -1, 0,		// 1
			0, -2, 0,		// 2
			1, -2, 0,		// 3
			2, -2, 0,		// 4
			1, -1, 0		// 5
		];

		
		this.indices = [
			//Counter-clockwise reference of vertices
			0, 1, 5,
			1, 2, 5,
			2, 3, 5,
			3, 4, 5,

			//Clockwise reference of vertices
			5, 1, 0,
			5, 2, 1,
			5, 3, 2,
			5, 4, 3
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}