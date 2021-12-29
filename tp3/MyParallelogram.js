import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
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
			11, 7, 6,
			11, 8, 7,
			11, 10, 8,
			8, 10, 9
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


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}