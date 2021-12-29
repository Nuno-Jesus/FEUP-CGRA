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
        this.initMaterials(this.scene);
	
        this.Diamond = new MyDiamond(this.scene);
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);
        this.orangeTriangle = new MyTriangleBig(this.scene);
        this.blueTriangle = new MyTriangleBig(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
        this.Parallelogram = new MyParallelogram(this.scene);

    }

    initMaterials(scene){
        
        this.green = new CGFappearance(scene);
        this.blue = new CGFappearance(scene);
        this.pink = new CGFappearance(scene);
        this.purple = new CGFappearance(scene);
        this.orange = new CGFappearance(scene);
        this.yellow = new CGFappearance(scene);
        this.red = new CGFappearance(scene);

        this.green.setAmbient(0.3, 0.3, 0.3, 1.0);
        this.blue.setAmbient(0.3, 0.3, 0.3, 1.0); 
        this.pink.setAmbient(0.3, 0.3, 0.3, 1.0); 
        this.purple.setAmbient(0.3, 0.3, 0.3, 1.0);
        this.orange.setAmbient(0.3, 0.3, 0.3, 1.0);
        this.yellow.setAmbient(0.3, 0.3, 0.3, 1.0);
        this.red.setAmbient(0.3, 0.3, 0.3, 1.0);
        
        this.green.setDiffuse(0.0, 1.0, 0.0, 0)
        this.blue.setDiffuse(0.0, 0.0, 1.0, 0) 
        this.pink.setDiffuse(1.0, 155.0/255, 207.0/255, 0.0);
        this.purple.setDiffuse(60.0/255, 19.0/255, 97.0/255, 0.0);
        this.orange.setDiffuse(1.0, 155/255, 0.0, 0.0);
        this.yellow.setDiffuse(1.0, 1.0, 0.0, 0.0);
        this.red.setDiffuse(1.0, 0.0, 0.0, 0.0);
        
        this.green.setSpecular(1.0, 1.0, 1.0, 0.0);
        this.blue.setSpecular(1.0, 1.0, 1.0, 0.0);
        this.pink.setSpecular(1.0, 1.0, 1.0, 0.0);
        this.purple.setSpecular(1.0, 1.0, 1.0, 0.0);
        this.orange.setSpecular(1.0, 1.0, 1.0, 0.0);
        this.yellow.setSpecular(1.0, 1.0, 1.0, 0.0);
        this.red.setSpecular(1.0, 1.0, 1.0, 0.0);

        this.green.setShininess(10.0);
        this.blue.setShininess(10.0);
        this.pink.setShininess(10.0);
        this.purple.setShininess(10.0);
        this.orange.setShininess(10.0);
        this.yellow.setShininess(10.0);
        this.red.setShininess(10.0);

    }

    display(){
                /* Diamond */

        this.scene.pushMatrix();
        this.scene.translate(2.12, 4.5, 0);
        this.scene.rotate(Math.PI/4.0, 0, 0, 1);
        //this.green.apply();
        this.Diamond.display();
        this.scene.popMatrix();
        
        /*  Triangulo grande laranja */
        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4.0, 0, 0, 1);
        this.orange.apply();
        this.orangeTriangle.display();
        this.scene.popMatrix();  
        
        /*  Triangulo normal rosa  */
        
        this.scene.pushMatrix();
        this.scene.translate(0, -1.41, 0);
        this.scene.rotate(-Math.PI/4.0, 0, 0, 1);
        this.pink.apply();
        this.pinkTriangle.display();
        this.scene.popMatrix();
        
        /*  Triangulo grande azul */
        
        this.scene.pushMatrix();
        this.scene.translate(0, 2.825, 0);
        this.scene.rotate(5*Math.PI/4.0, 0, 0, 1);
        this.blue.apply();
        this.blueTriangle.display();
        this.scene.popMatrix();  
        
        /*  Paralelogramo */
        
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4, 0, 0, 1)
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.yellow.apply();
        this.Parallelogram.display();
        this.scene.popMatrix();  
        
        /* Triangulo Pequeno 1 */
        
        this.scene.pushMatrix();
        this.scene.translate(0.51, -3.331, 0)
        this.scene.rotate(-5*Math.PI/4.0, 0, 0, 1)
        this.red.apply();
        this.redTriangle.display();
        this.scene.popMatrix();
        
        /* Triangulo Pequeno 2 */
        
        this.scene.pushMatrix();
        this.scene.translate(2.12, -3.331, 0)
        this.scene.rotate(-5*Math.PI/4.0, 0, 0, 1)
        this.purple.apply();
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
