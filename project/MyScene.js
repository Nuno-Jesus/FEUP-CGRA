import { CGFscene, CGFcamera, CGFshader, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPillar } from "./MyPillar.js";
import { MySea } from "./MySea.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MyAlgaeSet } from "./MyAlgaeSet.js";
import { MyAnimatedAlgaeSet } from "./MyAnimatedAlgaeSet.js";
import { MyRoundRockSet } from "./MyRoundRockSet.js";
import { CGFcamera2 } from "./CGFcamera2.js" 

/**
* MyScene
* @method constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(50);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.selectedFishTexture = -1;
        this.selectedPillarTexture = -1;
        
        //Interface booleans for objects display
        this.displaySkybox = true;
        this.displayFish = true;
        this.displaySeaFloor = true;
        this.displayRockSet = true;
        this.displayPillars = true;
        this.displayWater = true;
        this.displayAlgae = true;
        this.displayAlgaeSet = true;
        this.displayAnimatedAlgaeSet = true;
        this.displayRoundRockSet = true;
        this.t1 = 0;
        
        //Variable parameters to define the color of the fish
        this.fishColorR = 0;
        this.fishColorG = 0;
        this.fishColorB = 255;

        //Booleans used to controle the movement of the fish
        this.stopLeftFin = false;
        this.stopRightFin = false;
        this.fishPickedRock = false;
        this.fishThrewRock = false;
        this.deltaIsZero = true;

        this.textureIds1 = { 'Texture 1': 0, 'Texture 2': 1 };
        this.textureIds2 = { 'Texture 1': 0, 'Texture 2':1, 'Texture 3':2, 'Texture 4':3};

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

        this.algaeShader = new CGFshader(this.gl, 'shaders/algae.vert', 'shaders/algae.frag');
        
        /* ******** Cube Map Textures ******* */
        this.texFront = new CGFtexture(this, 'images/underwater_cubemap/front.jpg');
        this.texBack = new CGFtexture(this, 'images/underwater_cubemap/back.jpg');
        this.texLeft = new CGFtexture(this, 'images/underwater_cubemap/left.jpg');
        this.texRight = new CGFtexture(this, 'images/underwater_cubemap/right.jpg');
        this.texTop = new CGFtexture(this, 'images/underwater_cubemap/top.jpg');
        this.texBottom = new CGFtexture(this, 'images/underwater_cubemap/bottom.jpg');
        
        //Objects
        this.axis = new CGFaxis(this);
        this.fish = new MyMovingFish(this, 16, 8);
        this.skybox = new MyCubeMap(this, this.texTop, this.texBottom, this.texLeft, this.texFront, this.texRight, this.texBack);
        this.seaFloor = new MySeaFloor(this, 50, 1.0);
        this.rockSet = new MyRockSet(this, 16, 8);
        this.pillar = new MyPillar(this, 20);
        this.water = new MySea(this, 20);
        this.roundRockSet = new MyRoundRockSet(this, 16, 8, 5, 30);
        
        this.algaeSetArray = [];
        this.algaeSetOffsetX = [];
        this.algaeSetOffsetZ = [];
        this.numAlgaeSets = Math.random() * 10 + 10;

        this.AnimatedAlgaeSetArray = [];
        this.AnimatedAlgaeSetOffsetX = [];
        this.AnimatedAlgaeSetOffsetZ = [];
        this.numAnimatedAlgaeSets = Math.random() * 5 + 3;
        
        //"Normal" algae
        for(var i = 0; i < this.numAlgaeSets; i++){
            this.algaeSetArray[i] = new MyAlgaeSet(this, 4, 5);
            var negative = Math.random() * 2.0;

            if(negative <= 1.0)
                this.algaeSetOffsetX[i] = - Math.random() * 20;
            else
                this.algaeSetOffsetX[i] = Math.random() * 20;

            negative = Math.random() * 2.0;

            if(negative <= 1.0)
                this.algaeSetOffsetZ[i] = - Math.random() * 20;
            else
                this.algaeSetOffsetZ[i] = Math.random() * 20;
        }
        
        //Animated algae
        for(var i = 0; i < this.numAnimatedAlgaeSets; i++){
            this.AnimatedAlgaeSetArray[i] = new MyAnimatedAlgaeSet(this, 4, 5, this.algaeShader);
            var negative = Math.random() * 2.0;

            if(negative <= 1.0)
                this.AnimatedAlgaeSetOffsetX[i] = - Math.random() * 20;
            else
                this.AnimatedAlgaeSetOffsetX[i] = Math.random() * 20;

            negative = Math.random() * 2.0;

            if(negative <= 1.0)
                this.AnimatedAlgaeSetOffsetZ[i] = - Math.random() * 20;
            else
                this.AnimatedAlgaeSetOffsetZ[i] = Math.random() * 20;
        }
        
        //Objects connected to MyInterface
        this.displayAxis = false;
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(-15, -2, 5, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].enable();
        this.lights[1].update();
    }

    initCameras() {
        //this.camera = new CGFcamera2(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 2, 0));
        this.camera = new CGFcamera2(1.5, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    checkKeys(){
        var text="Keys pressed: ";
        var keysPressed=false;
        
        //Accelerate fish
        if (this.gui.isKeyPressed("KeyW")) {
            text +=" W ";
            keysPressed = true;
            
            this.fish.accelerate(0.3 * this.speedFactor);
        }
        
        //Turn fish left and lock left fin
        if (this.gui.isKeyPressed("KeyA")) {
            text +=" A ";
            keysPressed = true;
            
            this.fish.turn(10);
            this.stopLeftFin = true;
        }
        
        //Slow fish down
        if (this.gui.isKeyPressed("KeyS")) {
            text +=" S ";
            keysPressed = true;
            
            this.fish.accelerate(-0.3 * this.speedFactor);
        }
        
        //Turn fish right and lock right fin
        if (this.gui.isKeyPressed("KeyD")) {
            text +=" D ";
            keysPressed = true;
            
            this.fish.turn(-10);
            this.stopRightFin = true;
        }

        //Reset fish original position and all rocks
        if (this.gui.isKeyPressed("KeyR")) {
            text +=" R ";
            keysPressed = true;
            
            this.fish.reset();
            this.rockSet.reset();
            this.fishPickedRock = false;
        }

        //Make the fish go down
        if (this.gui.isKeyPressed("KeyL")) {
            text +=" L ";
            keysPressed = true;
            
            this.fish.down(-0.1 * this.speedFactor);
        }
        
        //Make the fish go up
        if (this.gui.isKeyPressed("KeyP")) {
            text +=" P ";
            keysPressed = true;
            
            this.fish.up(0.1 * this.speedFactor);
        } 
        
        //Make the fish take a rock or put it down if already has one
        if (this.gui.isKeyPressed("KeyC")) {
            text +=" C ";
            keysPressed = true;
            
            //If the fish hasn't picked a rock yet
            if(!this.fishPickedRock){
                this.rockToRemove = -1;
                
                //Verify if the fish is near any of the rocks generated earlier in the Rock Set
                for(var i = 0; i < this.rockSet.numRocks; i++){
                    var posX = this.rockSet.rockArray[i].x;
                    var posY = this.rockSet.rockArray[i].y;
                    var posZ = this.rockSet.rockArray[i].z;

                    var fishX = this.fish.fish.x;
                    var fishY = this.fish.fish.y;
                    var fishZ = this.fish.fish.z;

                    var distance = Math.sqrt(Math.pow(posX - fishX, 2) + Math.pow(posY - fishY, 2) + Math.pow(posZ - fishZ, 2));  
                    
                    //If the fish is within a 1.5 radius sphere around the rock
                    if(distance < 1.5){
                        //Gets the index of the rock which position will be changed
                        this.rockToRemove = i;
                        this.fishPickedRock = true;
                        break;
                    }
                }
            }

            //If the fish has a rock and is on the lower limit of the sea
            if(this.fishPickedRock && this.fish.fish.y === 1.0){
                var nestX = 17;
                var nestY = 0;
                var nestZ = 17;
                var nestRadius = this.roundRockSet.radius;

                var fishX = this.fish.fish.x;
                var fishY = this.fish.fish.y;
                var fishZ = this.fish.fish.z;
                
                //Verify if the fish is inside the nest
                var distance = Math.pow(fishX - nestX, 2) + Math.pow(fishY - nestY, 2) + Math.pow(fishZ - nestZ, 2);
                //If the fish is in the nest sphere
                if(distance < Math.pow(nestRadius, 2)){
                    //Calls the rockSet update to translate the rock to the nest
                    this.rockSet.update(this.rockToRemove, fishX, -0.9, fishZ);
                    this.fishPickedRock = false;
                }  
            }

            //If the fish has a rock and is on the upper limit of the sea
            if(this.fishPickedRock && this.fish.fish.y === 5.0){
                var nestX = 17;
                var nestY = 0;
                var nestZ = 17;
                var nestRadius = this.roundRockSet.radius;

                var fishX = this.fish.fish.x;
                var fishY = this.fish.fish.y;
                var fishZ = this.fish.fish.z;
                
                //Verify if the fish is 5 units away from the nest
                var distance = Math.pow(fishX - nestX, 2) + Math.pow(fishY - nestY, 2) + Math.pow(fishZ - nestZ, 2);
                distance = Math.sqrt(distance);
                distance -= nestRadius;
                distance = Math.ceil(distance);

                console.log("Distance to nest: ", distance);

                if(distance === 5){
                    this.fishThrewRock = true;
                    this.fishPickedRock = false;
                }  
            }
        }
        
        if (keysPressed)
            console.log(text);

    }

    //Called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.fish.update(t / 500 % 100, this.stopLeftFin, this.stopRightFin, this.fish.fish.speed);
        
        //When the user is not pressing A, the fish's left fin is unlocked
        if(!this.gui.isKeyPressed("KeyA")){
            this.stopLeftFin = false;
        }

        //Same goes with the right fin (not pressing D)
        if(!this.gui.isKeyPressed("KeyD")){
            this.stopRightFin = false;
        }
        
        /**
         * In 'MyMovingObject' class we define an atribute called 'this.auxAngle', that calculates the orientation of the fish according to 'this.hOrent'.
         * This angle was calculated according to the fish's central point.
         * If the fish translates to another point not lined up with the origin, the fish acquires two angles: 
         * 
         * -> 'this.auxAngle' = the angle of the fish around it's central point;
         * -> Angle 'Beta' = the angle of the central point around the origin;
         * 
         * If the fish is translated from the origin following (x, y, z), where each of the components are the fish coordinates, that means the fish's mouth
         * position will be calculated according to this:
         * 
         * mouthX = x + scaleZ * cos(Alpha);
         * mouthY = y;
         * mouthZ = z + scaleZ * sin(Alpha);
         * 
         * where:
         * 
         * -> scaleZ is the largest of the scales in XYZ, defining the radius of the circle the mouth does
         * -> Alpha is the angle obtained by this.auxAngle - Beta
         * */ 

        if(this.fishPickedRock){
            var fishX = this.fish.fish.x;
            var fishY = this.fish.fish.y;
            var fishZ = this.fish.fish.z;

            var scaleZ = this.fish.fish.Fish.bodyScaleZ;
            
            var radius = Math.sqrt(Math.pow(fishX, 2) + Math.pow(fishY, 2) + Math.pow(fishZ, 2));
            var beta = Math.acos(fishX/radius) * Math.PI/180;
            var alpha = this.fish.fish.auxAngle - beta;

            var mouthX = fishX + scaleZ * Math.sin(alpha);
            var mouthY = fishY;
            var mouthZ = fishZ + scaleZ * Math.cos(alpha);

            this.rockSet.update(this.rockToRemove, mouthX, mouthY, mouthZ);
        }

        if(this.fishThrewRock){
            var fishX = this.fish.fish.x;
            var fishY = this.fish.fish.y;
            var fishZ = this.fish.fish.z;

            var rockX = this.rockSet.rockArray[this.rockToRemove].x;
            var rockY = this.rockSet.rockArray[this.rockToRemove].y;
            var rockZ = this.rockSet.rockArray[this.rockToRemove].z;

            var scaleZ = this.fish.fish.Fish.bodyScaleZ;
            
            //Because there isn't a first instant 't' in the first update, this block won't be read
            if(!this.deltaIsZero){
                rockX += 0.1 * (t / 500 % 100 - this.t1) * rockX;
                rockZ += 0.1 * (t / 500 % 100 - this.t1) * rockZ;
            }

            //3D Parabola: rockY = -((rockX - fishX)^2 + (rockZ - fishZ)^2)/8.0 + fishY
            rockY = -(Math.pow(rockX - fishX, 2) + Math.pow(rockZ - fishZ, 2))/8.0 + fishY; //3D Upside down parabola

            //The rock stops when hitting the ground
            if(rockY <= -0.9){
                rockY = -0.9;
                this.fishThrewRock = false;
                this.deltaIsZero = true;
            }
            
            //After the first update, the boolean will turn false and allow the block above to be read.
            //Also, t1 gets the value of the old 't' so a deltaT is created: t - this.t1 
            else{
                this.rockSet.update(this.rockToRemove, rockX, rockY, rockZ);
                
                this.t1 = t / 500 % 100;
                this.deltaIsZero = false;
            }
        }

        this.water.update(t);
        this.fish.updateColor();
        
        for(var i = 0; i < this.numAnimatedAlgaeSets; i++){
            this.AnimatedAlgaeSetArray[i].update(t);
        }
    }

    

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        var sca = [
            this.scaleFactor, 0.0, 0.0, 0.0,
            0.0, this.scaleFactor, 0.0, 0.0,
            0.0, 0.0, this.scaleFactor, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];
        
        this.defaultAppearance.apply();
        if (this.displayAxis)
            this.axis.display();
          
        if(this.displaySkybox){
            this.pushMatrix();
            this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
            this.scale(50, 50, 50);
            this.skybox.display();
            this.popMatrix();
        }
        
        this.multMatrix(sca);
        if(this.displaySeaFloor){
            this.seaFloor.display();
        }
        
        if(this.displayWater){
            this.water.displayWater();
        }
        
        if(this.displayPillars){
            this.pillar.display();
        }
        
        if(this.displayFish)
            this.fish.display();
                    

        if(this.displayRockSet){
            this.rockSet.display();
        }


        if(this.displayAlgaeSet){
            for(var i = 0; i < this.numAlgaeSets; i++){
                this.pushMatrix();
                this.translate(this.algaeSetOffsetX[i], 0, this.algaeSetOffsetZ[i]);
                this.algaeSetArray[i].display();
                this.popMatrix();
            } 
        }
        
        if(this.displayAnimatedAlgaeSet){
            this.setActiveShader(this.algaeShader);
            for(var i = 0; i < this.numAnimatedAlgaeSets; i++){
                this.pushMatrix();
                this.translate(this.AnimatedAlgaeSetOffsetX[i], 0, this.AnimatedAlgaeSetOffsetZ[i]);
                this.AnimatedAlgaeSetArray[i].display();
                this.popMatrix();
            } 
        } 
        this.setActiveShader(this.defaultShader);

        if(this.displayRoundRockSet){
            this.pushMatrix();
            this.translate(17, 0, 17);
            this.roundRockSet.display();
            this.popMatrix();
        }
    }
}