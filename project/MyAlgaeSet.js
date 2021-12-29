import { CGFobject } from '../lib/CGF.js';
import { MyAlgae } from "./MyAlgae.js"

/**
* MyAlgaeSet
*  @method constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of divisions around the Y axis for each algae
 * @param stacks - Number of divisions along the Y axis for each algae
*/
export class MyAlgaeSet extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.scene = scene;
    this.slices = slices;
    this.stacks = stacks;
      
    this.algaeArray = []; 
    this.numAlgae = 3 + Math.floor((Math.random() * 2));
  
    for(var i = 0; i < this.numAlgae; i++){
      this.algaeArray[i] = new MyAlgae(this.scene, this.slices, this.stacks);
      this.algaeArray[i].x = Math.random() * 0.2 - Math.random() * 0.2;
      this.algaeArray[i].y = 0.05;
      this.algaeArray[i].z = Math.random() * 0.2 - Math.random() * 0.2;
    }  
  }

  display(){
    for(var i = 0; i < this.numAlgae; i++){
      this.scene.pushMatrix();
      this.scene.translate(this.algaeArray[i].x, this.algaeArray[i].y, this.algaeArray[i].z);
      this.algaeArray[i].display();
      this.scene.popMatrix();
    }
  }

  update(t){
    for(var i = 0; i < this.numAlgae; i++){
      this.algaeArray[i].update(t);
    }
  }
}