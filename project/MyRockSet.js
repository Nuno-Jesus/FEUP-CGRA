import { CGFobject } from '../lib/CGF.js';
import { MyRock } from "./MyRock.js";

/**
 * MyRockSet
 * @method constructor
 * @param scene - MyScene object
 * @param slices - Number of vertical cuts in a rock
 * @param stacks - Number of horizontal cuts in a rock
 */
export class MyRockSet extends CGFobject{
  constructor(scene, slices, stacks) {
    super(scene);
    this.scene = scene;
    this.stacks = stacks * 2;
    this.slices = slices;
    
    this.rockArray = []; 

    //Used to reset algae (X|Y|Z) values
    this.resetOffsetX = [];
    this.resetOffsetY = [];
    this.resetOffsetZ = [];

    //Random number of rocks to generate(between 10 and 20)
    this.numRocks = 10 + Math.ceil((Math.random() * 10));
    
    //Creation of the rock array
    for(var i = 0; i < this.numRocks; i++){
      this.rockArray[i] = new MyRock(this.scene, this.slices, this.stacks, false);
      //Translations in X and Z in a range of [-20, 20]
      this.rockArray[i].x = Math.random() * 20 - Math.random() * 20;
      this.rockArray[i].y = 0.1;
      this.rockArray[i].z = Math.random() * 20 - Math.random() * 20;

      this.resetOffsetX[i] = this.rockArray[i].x;
      this.resetOffsetY[i] = this.rockArray[i].y;
      this.resetOffsetZ[i] = this.rockArray[i].z;
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

  /** Responsable for updating a rock's position if the fish catches it.
   * @param i Index of the rock to be modified
   * @param x New X coordinate of the rock
   * @param y New Y coordinate of the rock
   * @param z New Z coordinate of the rock
   */
  update(i, x, y, z){
    this.rockArray[i].x = x;
    this.rockArray[i].y = y;
    this.rockArray[i].z = z;
  }

  /** Resets the rocks positions to their original value. */
  reset(){
    for(var i = 0; i < this.numRocks; i++){
      this.rockArray[i].x = this.resetOffsetX[i];
      this.rockArray[i].y = this.resetOffsetY[i];
      this.rockArray[i].z = this.resetOffsetZ[i];
    } 
  }
}