import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        
        this.gui.add(this.scene, 'checkDiamond').name('Diamond');
        this.gui.add(this.scene, 'checkTriangle').name('Triangle');
        this.gui.add(this.scene, 'checkParallelogram').name('Parallelogram');
        this.gui.add(this.scene, 'checkTriangleSmall').name('Small Triangle');
        this.gui.add(this.scene, 'checkTriangleBig').name('Big Triangle');
        
        return true;
    }
}