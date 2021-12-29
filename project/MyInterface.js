import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @method constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');
        
        var folder1 = this.gui.addFolder('Textures');
        folder1.add(this.scene, 'selectedFishTexture', this.scene.textureIds2).name('Select Fish Texure');
        folder1.add(this.scene, 'selectedPillarTexture', this.scene.textureIds1).name('Select Pillar Texure');
        
        var folder2 = this.gui.addFolder('Objects');
        folder2.add(this.scene, 'displaySkybox').name('Display Skybox');
        folder2.add(this.scene, 'displayFish').name('Display Fish');
        folder2.add(this.scene, 'displaySeaFloor').name('Display Sea Floor');
        folder2.add(this.scene, 'displayRockSet').name('Display Rock Set');
        folder2.add(this.scene, 'displayPillars').name('Display Pillars');
        folder2.add(this.scene, 'displayWater').name('Display Water');
        folder2.add(this.scene, 'displayAlgaeSet').name('Display Algae Sets');
        folder2.add(this.scene, 'displayAnimatedAlgaeSet').name('Display Algae V2');
        folder2.add(this.scene, 'displayRoundRockSet').name('Display Nest');

        var folder3 = this.gui.addFolder('Colors');
        folder3.add(this.scene, 'fishColorR', 0, 255).name('Fish Color (R)');
        folder3.add(this.scene, 'fishColorG', 0, 255).name('Fish Color (G)');
        folder3.add(this.scene, 'fishColorB', 0, 255).name('Fish Color (B)');

        this.initKeys();

        return true;
    }

    initKeys(){
        //Create reference from the scene to the gui
        this.scene.gui = this;
        //Disable the processKeyboard function
        this.processKeyboard = function(){};
        //Create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event){
        //called when a key is pressed down
        //mark it as active in the array
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event){
        //called when a key is released
        //mark it as inactive in the array
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode){
        if(this.activeKeys[keyCode] === true && (keyCode == "keyL" || keyCode == "keyP")){
            this.activeKeys[keyCode] = false;
            return true;
        }

        return this.activeKeys[keyCode] || false;
    }  
}