import { MyMovingObject } from "./MyMovingObject.js";

/**
* MyMovingFish
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param slices - Vertical cuts meant to create the fish body and eyes
 * @param stacks - Horizontal cuts meant to create the fish body and eyes
*/
export class MyMovingFish extends MyMovingObject {
  constructor(scene, slices, stacks){
    super(scene);
    this.scene = scene;
    this.slices = slices;
    this.stacks = stacks;
    
    this.fish = new MyMovingObject(this.scene, this.slices, this.stacks);
  }


  /** Calls 'MyMovingObject' displayMov() method */    
  display(){
    this.fish.displayMov();
  } 

  /** Calls 'MyMovingObject' update() method */
  update(t, stopLeftFin, stopRightFin, speed){
    this.fish.update(t, stopLeftFin, stopRightFin, speed);
  }

  /** Calls 'MyMovingObject' updateColor() method */    
  updateColor(){
    this.fish.updateColor();
  }

  /** Calls 'MyMovingObject' turn() method */
  turn(val){
    this.fish.turn(val);
  }

  /** Calls 'MyMovingObject' accelerate() method */  
  accelerate(val){
    this.fish.accelerate(val);
  }

  /** Calls 'MyMovingObject' reset() method */  
  reset(){
    this.fish.reset();
  }

  /** Calls 'MyMovingObject' up() method */
  up(val){
    this.fish.up(val);
  }

  /** Calls 'MyMovingObject' down() method */
  down(val){
    this.fish.down(val);
  }
} 
    