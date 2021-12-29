import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyPillar
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of edges of the cylinder
 */
export class MyPillar extends CGFobject {
    constructor(scene, slices){
        super(scene);
        this.slices = slices;
        this.pillar1 = new MyCylinder(this.scene, slices);
        this.pillar2 = new MyCylinder(this.scene, slices);
        this.pillar3 = new MyCylinder(this.scene, slices);
        this.pillar4 = new MyCylinder(this.scene, slices);

        this.initMaterials(scene);
    }

    initMaterials(scene){
        this.LogTexture = new CGFappearance(scene);
		this.LogTexture.setAmbient(0.2, 0.2, 0.2, 1);
		this.LogTexture.setDiffuse(0.3, 0.5, 0.7, 1);
		this.LogTexture.setSpecular(0.0, 0.0, 0.0, 1);
		this.LogTexture.setShininess(10.0);
        
        this.pillarTexture1 = new CGFtexture(this.scene, 'images/Log.jpg');
        this.pillarTexture2 = new CGFtexture(this.scene, 'images/pilar.png');

        this.pillarTexture = [this.pillarTexture1, this.pillarTexture2];
    }

    display(){
        if(this.scene.selectedPillarTexture == -1)
            this.LogTexture.setTexture(this.pillarTexture[0]); 
        else
            this.LogTexture.setTexture(this.pillarTexture[this.scene.selectedPillarTexture]); 
        this.LogTexture.setTextureWrap('WRAP', 'WRAP');
        
        this.scene.pushMatrix();
        this.scene.translate(12, 0, 3);
        this.scene.scale(1, 10, 1);
        this.LogTexture.apply();
        this.pillar1.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(20, 0, 3);
        this.scene.scale(1, 10, 1);
        this.LogTexture.apply();
        this.pillar2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4, 0, 3);
        this.scene.scale(1, 10, 1);
        this.LogTexture.apply();
        this.pillar3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4, 0, 3);
        this.scene.scale(1, 10, 1);
        this.LogTexture.apply();
        this.pillar4.display();
        this.scene.popMatrix();
    }
}


