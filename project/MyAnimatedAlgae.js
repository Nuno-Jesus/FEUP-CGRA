import { CGFobject, CGFappearance, CGFshader } from '../lib/CGF.js';
import { MyStackedPyramid } from "./MyStackedPyramid.js"

/**
* MyAnimatedAlgae
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyAnimatedAlgae extends CGFobject {
    constructor(scene, slices, stacks, shader) {
        super(scene);
        this.scene = scene;
        this.slices = slices;
        this.stacks = stacks;
        this.shader = shader;
        
        this.algae = new MyStackedPyramid(this.scene, this.slices, this.stacks);
    
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.scaleXZ = Math.random() * 0.05 + 0.05;
        this.scaleY = Math.random() * 3.0 + 1.5;

        this.shader.setUniformsValues({timeFactor: 0});
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(this.scaleXZ, this.scaleY, this.scaleXZ);
        this.algae.display();
        this.scene.popMatrix();
    }

    update(t){
        this.shader.setUniformsValues({timeFactor: t / 200 % 100});
    }
}
