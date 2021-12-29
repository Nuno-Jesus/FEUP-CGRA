import {CGFobject} from '../lib/CGF.js';

/**
 * MyTriangle
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */

export class MyTriangle extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-1, 1, 0,		// 0
			-1, 0, 0,		// 1
			-1, -1, 0,		// 2
			0, -1, 0,		// 3
			1, -1, 0,		// 4
			0, 0, 0			// 5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 5,
			1, 2, 5,
			2, 3, 5,
			3, 4, 5
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.texCoords = [
			0, 0.5,
			0, 0.75,
			0, 1,
			0.25, 1,
			0.5, 1,
			0.25, 0.75
		];
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