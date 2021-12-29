import { CGFobject } from '../lib/CGF.js';
import { MyRock } from "./MyRock.js";

/** 
 * MyRoundRockSet
 * @method constructor
 * @param scene - MyScene object
 * @param slices - Number of vertical cuts in a rock
 * @param stacks - Number of horizontal cuts in a rock
 * @param radius - Radius of the circle made out of the rocks of set
 * @param numRocks - Number of rocks to be created around the circle
 */
export class MyRoundRockSet extends CGFobject{
  constructor(scene, slices, stacks, radius, numRocks) {
    super(scene);
    this.scene = scene;
    this.stacks = stacks * 2;
    this.slices = slices;
    this.radius = radius;
    this.numRocks = numRocks;
    
    this.rockArray = []; 

    //Angle used to calculate the position of a rock
    this.sliceAngle = 2*Math.PI/this.numRocks;
    
    for(var i = 0; i < this.numRocks; i++){
      this.rockArray[i] = new MyRock(this.scene, this.slices, this.stacks, true);
      this.rockArray[i].x = this.radius * Math.cos(i * this.sliceAngle);
      this.rockArray[i].y = 0;
      this.rockArray[i].z = this.radius * Math.sin(i * this.sliceAngle);
    } 
  }

  display(){
    for(var i = 0; i < this.numRocks; i++){
      this.scene.pushMatrix();
      this.scene.translate(this.rockArray[i].x, this.rockArray[i].y, this.rockArray[i].z);
      this.rockArray[i].displayRock();
      this.scene.popMatrix();
    }
  }
}