import { CGFobject, CGFappearance, CGFshader } from '../lib/CGF.js';
import { MyPyramid } from "./MyPyramid.js"

/**
* MyAlgae
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyAlgae extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.scene = scene;
        this.slices = slices;
        this.stacks = stacks;
        
        this.algae = new MyPyramid(scene, this.slices, this.stacks);
        
        this.offsetG = Math.random() * 0.9;
        this.offsetB = Math.random() * 0.1;
        
        this.color = new CGFappearance(scene);
        this.color.setAmbient(0.3, 0.3, 0.3, 1.0);
        this.color.setDiffuse(0.0, 0.1 + this.offsetG, 0.1 + this.offsetB, 0);
        this.color.setSpecular(1.0, 1.0, 1.0, 0);
        this.color.setShininess(10.0);
        
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.scaleXZ = Math.random() * 0.05 + 0.05;
        this.scaleY = Math.random() * 0.3 + 0.7;
        
        
    }   

    display(){
        this.scene.pushMatrix();
        this.scene.scale(this.scaleXZ, this.scaleY, this.scaleXZ);
        this.color.apply()
        this.algae.display();
        this.scene.popMatrix();
    }

    update(t){
        
    }
    

}