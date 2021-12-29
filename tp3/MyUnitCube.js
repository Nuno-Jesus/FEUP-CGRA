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
        -0.5, -0.5, 0.5, // E - 2
        0.5, -0.5, 0.5, // F - 3       
        
        -0.5, 0.5, -0.5, // C - 4
        0.5, 0.5, -0.5, // D - 5
        -0.5, -0.5, -0.5, // G - 6
        0.5, -0.5, -0.5, // H - 7
        
        -0.5, 0.5, 0.5, // A - 8
        0.5, 0.5, 0.5, // B - 9
        -0.5, 0.5, -0.5, // C - 10
        0.5, 0.5, -0.5, // D - 11

        -0.5, -0.5, 0.5, // E - 12
        0.5, -0.5, 0.5, // F - 13
        -0.5, -0.5, -0.5, // G - 14
        0.5, -0.5, -0.5, // H - 15

        0.5, 0.5, 0.5, // B - 16
        0.5, 0.5, -0.5, // D - 17
        0.5, -0.5, 0.5, // F - 18
        0.5, -0.5, -0.5, // H - 19

        -0.5, 0.5, 0.5, // A - 20
        -0.5, 0.5, -0.5, // C - 21
        -0.5, -0.5, 0.5, // E - 22
        -0.5, -0.5, -0.5 // G - 23

        ];

		//Counter-clockwise reference of vertices
		this.indices = [
            // face ABEF, plano z = 0.5 //
            0, 2, 1, // AEB
            1, 2, 3, // BEF
            
            // face CDGH, plano z = -0.5  //

            5, 7, 4, // DHC
            4, 7, 6, // CHG

            // face ABCD, plano y = 0.5 // 

            10, 8, 11, //CAD
            11, 8, 9, //DAB

            // face EFGH, plano y = -0.5 // 

             12, 14, 13, //EGF
             13, 14, 15, //FGH 
            
            // face BDFH, plano x = 0.5 // 
            16, 18, 17, // BFD
            17, 18, 19, // DFH
            
            // face ACEG, plano x = -0.5 // 

            21, 23, 20, // CGA
            20, 23, 22 // AGE
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            //
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            //
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            //
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            //
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            //
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0
        ]; 

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}