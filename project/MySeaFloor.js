import { CGFtexture, CGFshader, CGFobject } from "../lib/CGF.js";
import { MyPlane } from './MyPlane.js';

/**
* MySeaFloor
* @method constructor
* @param scene Reference to MyScene object
* @param slices Number of horizontal and vertical divisions in the floor plane
*/

export class MySeaFloor extends CGFobject {
    constructor(scene, slices, maxHeight){
        super(scene);
        this.scene = scene;
        this.slices = slices;
        this.maxHeight = maxHeight;

        this.y = -2.0;

        this.scaleX = 50;
        this.scaleY = this.scaleX;
        this.scaleZ = this.scaleX;

        this.floor = new MyPlane(scene, slices);
        this.floorShader = new CGFshader(scene.gl, 'shaders/sand.vert', 'shaders/sand.frag');
        this.sandMap = new CGFtexture(scene, 'images/sandMap.png');
        this.sand = new CGFtexture(scene, 'images/sand.png');
        
        this.floorShader.setUniformsValues({uSampler1: 1});
		this.floorShader.setUniformsValues({uSampler2: 2});
        this.floorShader.setUniformsValues({maxHeight: this.maxHeight});
    }

    display(){
        this.scene.setActiveShader(this.floorShader);
        this.scene.pushMatrix();
        
        this.sand.bind(1);
        this.sandMap.bind(2);
        
        this.scene.pushMatrix();
        this.scene.translate(0, this.y, 0);
        
        // need to rotate 90 degrees around X axis
        this.scene.rotate(-Math.PI/2 , 1, 0, 0);
        this.scene.scale(this.scaleX, this.scaleY, this.scaleZ);
        this.floor.display();
        this.scene.popMatrix();
        
        // use this command to only apply texture to this object
        this.scene.setActiveShader(this.scene.defaultShader);
    }

}