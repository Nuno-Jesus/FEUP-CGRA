import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";


/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initMaterials();
	
        this.Diamond = new MyDiamond(this.scene);
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene)
        this.blueTriangle = new MyTriangleBig(this.scene);
        this.orangeTriangle = new MyTriangleBig(this.scene)
        this.pinkTriangle = new MyTriangle(this.scene);
        this.Parallelogram = new MyParallelogram(this.scene);
        this.texCoords1 = [
            0, 0,
			0.25, 0.25,
			0, 0.25,
			0, 0.5
        ];
        this.texCoords2 = [
            1, 1,
            0.75, 0.75,
            1, 0.75,
            0.5, 0.5,
            0.75, 0.5,
            1, 0.5,
            0.75, 0.25,  
            1, 0.25,
            1, 0
			
        ];
    }

    initMaterials(){
        
        this.newMat = new CGFappearance(this.scene);
        this.newMat.setDiffuse(0.9, 0.9, 0.9, 1);
        this.newMat.setAmbient(0.1, 0.1, 0.1, 1);
        this.newMat.setSpecular(0.1, 0.1, 0.1, 1);
        this.newMat.setShininess(10.0);
        this.newMat.loadTexture('images/tangram.png');
        this.newMat.setTextureWrap('REPEAT', 'REPEAT');

    }

    display(){
                /* Diamond */

        this.scene.pushMatrix();
        this.scene.translate(2.12, 4.5, 0);
        this.scene.rotate(Math.PI/4.0, 0, 0, 1);
        this.newMat.apply();
        this.Diamond.display();
        this.scene.popMatrix();
        
        /*  Triangulo grande laranja */
        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4.0, 0, 0, 1);
        this.newMat.apply();
        this.orangeTriangle.updateTexCoords(this.texCoords2);
        this.orangeTriangle.display();
        this.scene.popMatrix();  
        
        /*  Triangulo normal rosa  */
        
        this.scene.pushMatrix();
        this.scene.translate(0, -1.41, 0);
        this.scene.rotate(-Math.PI/4.0, 0, 0, 1);
        this.newMat.apply();
        this.pinkTriangle.display();
        this.scene.popMatrix();
        
        /*  Triangulo grande azul */
        
        this.scene.pushMatrix();
        this.scene.translate(0, 2.825, 0);
        this.scene.rotate(5*Math.PI/4.0, 0, 0, 1);
        this.newMat.apply();
        this.blueTriangle.display();
        this.scene.popMatrix();  
        
        /*  Paralelogramo */
        
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4, 0, 0, 1)
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.newMat.apply();
        this.Parallelogram.display();
        this.scene.popMatrix();  
        
        /* Triangulo Pequeno 1 */
        
        this.scene.pushMatrix();
        this.scene.translate(0.51, -3.331, 0)
        this.scene.rotate(-5*Math.PI/4.0, 0, 0, 1)
        this.newMat.apply();
        this.redTriangle.display();
        this.scene.popMatrix();
        
        /* Triangulo Pequeno 2 */
        
        this.scene.pushMatrix();
        this.scene.translate(2.12, -3.331, 0)
        this.scene.rotate(-5*Math.PI/4.0, 0, 0, 1)
        this.newMat.apply();
        this.purpleTriangle.updateTexCoords(this.texCoords1);
        this.purpleTriangle.display();
        this.scene.popMatrix();
    }
    
    enableNormalViz(){
        this.Diamond.enableNormalViz();
        this.redTriangle.enableNormalViz();
        this.purpleTriangle.enableNormalViz();
        this.orangeTriangle.enableNormalViz();
        this.blueTriangle.enableNormalViz();
        this.pinkTriangle.enableNormalViz();
        this.Parallelogram.enableNormalViz();
    }
    
    
    disableNormalViz(){
        this.Diamond.disableNormalViz();
        this.redTriangle.disableNormalViz();
        this.purpleTriangle.disableNormalViz();
        this.orangeTriangle.disableNormalViz();
        this.blueTriangle.disableNormalViz();
        this.pinkTriangle.disableNormalViz();
        this.Parallelogram.disableNormalViz();
    }
      
}
