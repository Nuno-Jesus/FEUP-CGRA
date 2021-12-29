import {CGFobject} from '../lib/CGF.js';

/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
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

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}