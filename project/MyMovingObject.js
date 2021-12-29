import { CGFobject } from '../lib/CGF.js';
import { MyFish } from "./MyFish.js";

/**
* MyMovingObject
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param slices - Vertical cuts meant to create the fish body and eyes
 * @param stacks - Horizontal cuts meant to create the fish body and eyes
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        //this.MyPyramid = new MyPyramid(scene, slices, stacks);
        this.Fish = new MyFish(scene, slices, stacks);
        this.hOrent = 0;       //Angle in radians (initially set to 0) 
        this.speed = 0;        //Speed (initially set to 0)
        
        this.x = 0.0;             
        this.y = 3.0;
        this.z = 0.0;
    }
    
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
    
    /** Responsable for updating the Moving Object (fish) position,
     * according to the fish's speed. This method also calls 'MyFish' update() method.
     * @param t Time factor
     * @param stopLeftFin Boolean used to stop the left fin when rotating left
     * @param stopRightFin Boolean used to stop the right fin when rotating right
     * @param speed Fish speed
     */
    update(t, stopLeftFin, stopRightFin, speed){
        this.auxAngle2 = this.hOrent * Math.PI/180; // coloca em radianos
        
        this.x += 0.1 * this.speed * Math.sin(this.auxAngle2);  
        this.z += 0.1 * this.speed * Math.cos(this.auxAngle2);

        if(this.x > 20.0)
            this.x = 20.0;

        else if(this.x < -20.0)
            this.x = -20.0;

        if(this.z > 20.0)
            this.z = 20.0;

        else if(this.z < -20.0)
            this.z = -20.0;


        this.Fish.update(t, stopLeftFin, stopRightFin, speed);
    }

    /** Calls 'MyFish' updateColor() method */
    updateColor(){
        this.Fish.updateColor();
    }

    /** Displays the Moving Object according to its position. It also calls 'MyFish' display() method */
    displayMov(){
        this.auxAngle = this.hOrent * Math.PI/180; // transforma o ângulo em radianos
        
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y - 3, this.z);
        this.scene.rotate(this.auxAngle, 0, 1, 0); // em torno de YY
        this.Fish.display();
        this.scene.popMatrix(); 
    } 
    
    /** Changes Moving Object orientation (in Y axis) by adding a positive/negative value to its current angle 
     * @param val Increment to be added to this.hOrent
    */
    turn(val){
        this.hOrent += val;
    }
    
    /** Increases/Decreases the Moving Object speed by adding a positive/negative value to its current speed.
     * The Moving Object speed will never be negative (the fish will never go backwards)
     * @param val Value to be added to this.speed
     */
    accelerate(val){
        this.speed += val;

        if(this.speed < 0.0)
            this.speed = 0.0;

        else if(this.speed > 20.0)
            this.speed = 20.0;

        console.log("Fish speed: ", this.speed);

    }
    
    /** Resets all the changes made to attributes of orientation, speed, and position.
     * It also calls the 'MyFish' reset() method.
    */
    reset(){
        this.speed = 0;
        this.x = 0.0;
        this.y = 3.0;
        this.z = 0.0;
        this.hOrent = 0;
        this.height = 0;
        this.Fish.reset();
    }

    /** Increases the Moving Object's height by adding a positive value to its Y coordinate.
     * It's Y coordinate will never be bigger than 5.0.
     * @param val Value to be added to this.y
     */
    up(val){
        this.y += val;
        if(this.y > 5.0)
            this.y = 5.0;
            
    }

    /** Decreases the Moving Object's height by adding a negative value to its Y coordinate.
     * It's Y coordinate will never be lower than 1.0.
     * @param val Value to be added to this.y
     */
    down(val){
        this.y += val;
        if(this.y < 1.0)
            this.y = 1.0;
    }
}

