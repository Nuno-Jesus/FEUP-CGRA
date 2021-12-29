import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js"; 


/**
 * MyCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
	}

    init(){
      this.frontQuad = new MyQuad(this.scene);
      this.rightQuad = new MyQuad(this.scene);
      this.backQuad = new MyQuad(this.scene);
      this.leftQuad = new MyQuad(this.scene);
      this.upperQuad = new MyQuad(this.scene);
      this.lowerQuad = new MyQuad(this.scene);
    }

    display(){
      this.scene.pushMatrix();
      this.scene.translate(0, 0, 0.5);
      this.frontQuad.display();
      this.scene.popMatrix();
      
      this.scene.pushMatrix();
      this.scene.translate(0.5, 0, 0);
      this.scene.rotate(Math.PI/2.0, 0, 1, 0);
      this.rightQuad.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.5);
      this.scene.rotate(-Math.PI, 0, 1, 0);
      this.backQuad.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-0.5, 0, 0);
      this.scene.rotate(-Math.PI/2.0, 0, 1, 0);
      this.leftQuad.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, 0.5, 0);
      this.scene.rotate(-Math.PI/2.0, 1, 0, 0);
      this.upperQuad.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, -0.5, 0);
      this.scene.rotate(Math.PI/2.0, 1, 0, 0);
      this.lowerQuad.display();
      this.scene.popMatrix();
    }
}