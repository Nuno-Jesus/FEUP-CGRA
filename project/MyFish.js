import { CGFappearance, CGFobject, CGFshader, CGFtexture } from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
import { MySphere } from './MySphere.js';

/**
 * MyFish
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param slices - Fish's body/eyes vertical divisions
 * @param stacks - Fish's body/eyes horizontal divisions
 */
export class MyFish extends CGFobject {
	constructor(scene, slices, stacks){
		super(scene);
    this.scene = scene;
    this.slices = slices;
    this.stacks = stacks;
    
    this.body = new MySphere(this.scene, this.slices, this.stacks);
    this.rightEye = new MySphere(this.scene, this.slices, this.stacks);
    this.leftEye = new MySphere(this.scene, this.slices, this.stacks);
    this.leftFin = new MyTriangle(this.scene);
    this.rightFin = new MyTriangle(this.scene);
    this.topFin = new MyTriangle(this.scene);
    this.tail = new MyTriangle(this.scene);

    this.bodyScaleX = 0.4;
    this.bodyScaleY = 0.6;
    this.bodyScaleZ = 0.8;

    //First time instant
    this.t1 = 0;
    this.deltaIsZero = true;

    this.scales = new CGFshader(scene.gl, 'shaders/fish.vert', 'shaders/fish.frag');
    this.scales.setUniformsValues({uSampler1: 0});

    //RGB values to be set in the frag shader to change the fish's color
    this.scales.setUniformsValues({R: this.scene.fishColorR});
    this.scales.setUniformsValues({G: this.scene.fishColorG});
    this.scales.setUniformsValues({B: this.scene.fishColorB});
    
    //Fish textures
    this.fish1 = new CGFtexture(this.scene, 'textures/FishTexture.png');
    this.fish2 = new CGFtexture(this.scene, 'textures/FishTexture2.jpg');
    this.fish3 = new CGFtexture(this.scene, 'textures/FishTexture3.jpg');
    this.fish4 = new CGFtexture(this.scene, 'textures/FishTexture4.jpg');
    
    //Fish textures selector
    this.fishTextures = [this.fish1, this.fish2, this.fish3, this.fish4];

    //Displacements for fins and tail
    this.leftFinOffset = 0;
    this.rightFinOffset = 0;
    this.tailOffset = 0;
    
    //Booleans to set the offsets backwards
    this.setNegativeLeftFinOffset = false;
    this.setNegativeRightFinOffset = false;
    this.setNegativeTailOffset = false;

    //this.initBuffers();
    this.initMaterials(this.scene);
	}

  initMaterials(scene){
    //Pupil material
    this.pupil = new CGFappearance(scene);
    this.pupil.setAmbient(0.3, 0.3, 0.3, 1.0);
    this.pupil.setSpecular(1.0, 1.0, 1.0, 0);
    this.pupil.setShininess(10.0);
    this.pupil.loadTexture('images/pupil.png');

    //Variable fish color
    this.final = new CGFappearance(scene);
    this.final.setAmbient(0, 0, 0, 0.0);
    this.final.setDiffuse(this.scene.fishColorR/255.0, this.scene.fishColorG/255.0, this.scene.fishColorB/255.0, 1.0);
    this.final.setSpecular(0.1, 0.1, 0.1, 0);
    this.final.setShininess(120.0);
  
  }
	
	display(){
    //******************************* BODY *******************************
    this.scene.setActiveShader(this.scales);
    this.scene.pushMatrix();
    if (this.scene.selectedFishTexture == -1)
      this.fish4.bind(0);
    else
      this.fishTextures[this.scene.selectedFishTexture].bind(0);

    this.scene.translate(0, 3, 0);
    this.scene.scale(this.bodyScaleX, this.bodyScaleY, this.bodyScaleZ);
    //Rotate so the texture starts on the tail
    this.scene.rotate(Math.PI/2, 0, 1, 0);
    this.body.display();
    this.scene.popMatrix();
    this.scene.setActiveShader(this.scene.defaultShader);

    //***************************** LEFT FIN *****************************
    this.scene.pushMatrix();
    this.scene.translate(0.35, 2.7, 0.1);
    this.scene.scale(0.2, 0.2, 0.2);
    this.scene.rotate(Math.PI/4.0 - this.leftFinOffset, 0, 0, 1);
    this.scene.rotate(Math.PI/2.0, 0, 1, 0);
    this.final.apply();
    this.leftFin.display();
    this.scene.popMatrix();

    //***************************** RIGHT FIN ****************************
    this.scene.pushMatrix();
    this.scene.translate(-0.35, 2.7, 0.1);
    this.scene.scale(0.2, 0.2, 0.2);
    this.scene.rotate(-Math.PI/4.0 + this.rightFinOffset, 0, 0, 1);
    this.scene.rotate(Math.PI/2.0, 0, 1, 0);
    this.final.apply();
    this.rightFin.display();
    this.scene.popMatrix();

    //****************************** TOP FIN *****************************
    this.scene.pushMatrix();
    this.scene.translate(0, 3.9, -0.18);
    this.scene.rotate(-Math.PI/2, 0, 3, 0);
    this.scene.scale(0.2, 0.2, 0.2);
    this.final.apply();
    this.topFin.display();
    this.scene.popMatrix(); 

    //******************************* TAIL *******************************
    this.scene.pushMatrix();
    this.scene.translate(0, 3, -0.8);
    this.scene.scale(0.3, 0.3, 0.3);
    this.scene.rotate(Math.PI/2.0 + this.tailOffset, 0, 3, 0);
    this.scene.rotate(-Math.PI/4.0, 0, 0, 1);
    this.scene.translate(0, 2, 0);
    this.final.apply();
    this.tail.display();
    this.scene.popMatrix();

    //***************************** RIGHT EYE ****************************
    this.scene.pushMatrix();
    this.scene.translate(0.25, 3.2, 0.5);
    this.scene.scale(0.1, 0.1, 0.1);
    this.scene.rotate(-0.285, 0, 1, 0);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.pupil.apply();
    this.rightEye.display();
    this.scene.popMatrix();

    //***************************** LEFT FIN *****************************
    this.scene.pushMatrix();
    this.scene.translate(-0.25, 3.2, 0.5);
    this.scene.scale(0.1, 0.1, 0.1);
    this.scene.rotate(0.285, 0, 1, 0);
    this.pupil.apply();
    this.leftEye.display();
    this.scene.popMatrix();
  } 

  /** Resets all fin and tail offsets as well as the booleans to invert the offsets */
  reset(){
    this.leftFinOffset = 0;
    this.rightFinOffset = 0;
    this.tailOffset = 0;
    
    this.setNegativeLeftFinOffset = false;
    this.setNegativeRightFinOffset = false;
    this.setNegativeTailOffset = false;
  }
  
  /** Function responsable for rotating both fish side fins and tail,
   * according to the fish speed.
   * @param t Time factor
   * @param stopLeftFin Boolean used to stop the left fin when rotating left
   * @param stopRightFin Boolean used to stop the right fin when rotating right
   * @param speed Fish speed
  */
  update(t, stopLeftFin, stopRightFin, speed){
    /************************ LEFT FIN ************************/
    if(!this.setNegativeLeftFinOffset){
      //If the left fin is moving
      if(!stopLeftFin){
        //If the fish is moving as well, calculates d = t * s
        if(speed !== 0)
          this.leftFinOffset += 0.02 * speed;

        //Otherwise the fin will keep swinging at a minimum rate
        else  
          this.leftFinOffset += 0.02;
      }
      
      //Reverse left fin angle when reaching 0.26
      if(this.leftFinOffset > 0.40){
        this.leftFinOffset = 0.40;
        this.setNegativeLeftFinOffset = true;
      }
      
    }

    //Does the same but backwards
    else{
      if(!stopLeftFin){
        if(speed !== 0)
          this.leftFinOffset -= 0.02  * speed;
        
        else  
          this.leftFinOffset -= 0.02;
      }

      if(this.leftFinOffset < -0.26){
        this.leftFinOffset = -0.26;
        this.setNegativeLeftFinOffset = false;
      }
      
    }
    
    /************************ RIGHT FIN ************************/
    if(!this.setNegativeRightFinOffset){
      //If the right fin is moving
      if(!stopRightFin){
        //If the fish is moving as well, calculates d = t * s
        if(speed !== 0)
          this.rightFinOffset += 0.02  * speed;

        //Otherwise the fin will keep swinging at a minimum rate
        else  
          this.rightFinOffset += 0.02;
      }
        
      //Reverse right fin angle when reaching 0.26
      if(this.rightFinOffset > 0.40){
        this.rightFinOffset = 0.40;
        this.setNegativeRightFinOffset = true;
      }
      
    }
    
    //Does the same but backwards
    else{
      if(!stopRightFin){
        if(speed !== 0)
          this.rightFinOffset -= 0.02  * speed;
        
        else  
          this.rightFinOffset -= 0.02;
      }
        

      if(this.rightFinOffset < -0.26){
        this.rightFinOffset = -0.26;
        this.setNegativeRightFinOffset = false;
      }
      
    }

    /************************** TAIL ***************************/
    if(!this.setNegativeTailOffset){
      //If the fish is moving
      if(speed !== 0)
        this.tailOffset += 0.05 * speed;

      //Otherwise, the tail will keep swinging at a minimum rate
      else  
        this.tailOffset += 0.05;
      
      //Reverse tail angle if when reaching 0.35
      if(this.tailOffset > 0.35){
        this.tailOffset = 0.35;
        this.setNegativeTailOffset = true;
      }
      
    }

    //Does the same but backwards
    else{
        if(speed !== 0)
          this.tailOffset -= 0.05 * speed;
        else  
          this.tailOffset -= 0.05;

      if(this.tailOffset < -0.35){
        this.tailOffset = -0.35;
        this.setNegativeTailOffset = false;
      }
    }

    /* After a rotation, the fish's fins get asynchronous. To prevent that, the fish will 
    always have its fins with the same offset WHEN BOTH FINS ARE MOVING. */
    if(!stopLeftFin && !stopRightFin)
      this.leftFinOffset = this.rightFinOffset;

    this.t1 = t;
  } 

  /** Updates the fish's color on the shader with the user input */
  updateColor(){
    this.scales.setUniformsValues({R: this.scene.fishColorR});
    this.scales.setUniformsValues({G: this.scene.fishColorG});
    this.scales.setUniformsValues({B: this.scene.fishColorB});

    this.final.setDiffuse(this.scene.fishColorR/255.0, this.scene.fishColorG/255.0, this.scene.fishColorB/255.0, 1);
  }
}