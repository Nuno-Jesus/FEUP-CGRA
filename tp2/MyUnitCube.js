import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
        -0.5, 0.5, 0.5, // A - 0
        0.5, 0.5, 0.5, // B - 1
        -0.5, 0.5, -0.5, // C - 2
        0.5, 0.5, -0.5, // D - 3
       -0.5, -0.5, 0.5, // E - 4
        0.5, -0.5, 0.5, // F - 5        
        -0.5, -0.5, -0.5, // G - 6
        0.5, -0.5, -0.5 // H - 7
        ];

		//Counter-clockwise reference of vertices
		this.indices = [
            // face ABEF //
            0, 4, 1, // AEB
            1, 4, 5, // BEF

             // face BDFH //
            1, 5, 3, // BFD
            3, 5, 7, // DFH
            
            
            // face CDGH //

            3, 7, 2, // DHC
            2, 7, 6, // CHG

            // face ACEG //

            2, 6, 0, // CGA
            0, 6, 4,  // AGE

            // face ABCD //

            2, 0, 3, //CAD
            3, 0, 1, //DAB

            // face EFGH //

            4, 6, 5, //EGF
            5, 6, 7  //FGH 
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}