import { CGFobject } from '../lib/CGF.js';
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
		this.init();
	}

    init(){
        this.Diamond = new MyDiamond(this.scene);
        
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);

        this.orangeTriangle = new MyTriangleBig(this.scene);
        this.blueTriangle = new MyTriangleBig(this.scene);

        this.pinkTriangle = new MyTriangle(this.scene);
        
        this.Parallelogram = new MyParallelogram(this.scene);

    }

    display(){
                /* Diamond */

        this.scene.pushMatrix();
        this.scene.translate(2.12, 4.5, 0);
        this.scene.rotate(Math.PI/4.0, 0, 0, 1);
        this.scene.setDiffuse(0,1,0,0);
        this.Diamond.display();
        this.scene.popMatrix();

        /*  Triangulo grande laranja */
        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4.0, 0, 0, 1);
        this.scene.setDiffuse(1,155/255,0,0);
        this.orangeTriangle.display();
        this.scene.popMatrix();  

        /*  Triangulo normal rosa  */

        this.scene.pushMatrix();
        
        this.scene.translate(0, -1.41, 0);
        this.scene.rotate(-Math.PI/4.0, 0, 0, 1);
        this.scene.setDiffuse(1,155/255,207/255,0);
        this.pinkTriangle.display();
        this.scene.popMatrix();

        /*  Triangulo grande azul */
        
        this.scene.pushMatrix();
        
        this.scene.translate(0, 2.825, 0);
        this.scene.rotate(5*Math.PI/4.0, 0, 0, 1);
        this.scene.setDiffuse(0,155/255,1,0);
        this.blueTriangle.display();
        this.scene.popMatrix();  

        /*  Paralelogramo */
        
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4, 0, 0, 1)
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.setDiffuse(1,1,0,0);
        this.Parallelogram.display();
        this.scene.popMatrix();  
        
        /* Triangulo Pequeno 1 */
        
        this.scene.pushMatrix();
        this.scene.translate(0.51, -3.331, 0)
        this.scene.rotate(-5*Math.PI/4.0, 0, 0, 1)
        this.scene.setDiffuse(1,27/255,27/255,0);
        this.redTriangle.display();
        this.scene.popMatrix();

        /* Triangulo Pequeno 2 */

        this.scene.pushMatrix();
        this.scene.translate(2.12, -3.331, 0)
        this.scene.rotate(-5*Math.PI/4.0, 0, 0, 1)
        this.scene.setDiffuse(150/255,80/255,90/255,0);
        this.purpleTriangle.display();
        this.scene.popMatrix();
    }
}