import {CGFobject, CGFtexture, CGFshader, CGFappearance} from '../lib/CGF.js';
import {MyPlane} from "./MyPlane.js"
/**
* MySea
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - Number of divisions of the sea plane
*/

export class MySea extends CGFobject {
	constructor(scene, nrDivs) {
		super(scene);
    this.scene = scene;
    this.nrDivs = nrDivs;
    this.water = new MyPlane(this.scene, this.nrDivs);

    this.y = 10;

    this.scaleX = 50;
    this.scaleY = this.scaleX;
    this.scaleZ = this.scaleX;

    this.waterShader = new CGFshader(this.scene.gl, 'shaders/water.vert', 'shaders/water.frag');
    this.waterShader.setUniformsValues({uSampler1: 1});
    this.waterShader.setUniformsValues({uSampler2: 2});
    this.waterShader.setUniformsValues({timeFactor: 0});

    this.distortionMap = new CGFtexture(this.scene, "images/distortionmap.png");
    this.pier = new CGFtexture(this.scene, "images/pier.jpg");
	}

  displayWater(){
    this.scene.setActiveShader(this.waterShader);
   
    this.scene.pushMatrix();
    this.pier.bind(1);
    this.distortionMap.bind(2);
  
    this.scene.translate(0, this.y, 0);
    this.scene.scale(this.scaleX, this.scaleY, this.scaleZ);
    this.scene.rotate(Math.PI/2.0, 1, 0, 0);
    this.water.display();
    this.scene.popMatrix();
    this.scene.setActiveShader(this.scene.defaultShader);
  }

  update(t){
    this.waterShader.setUniformsValues({timeFactor: t / 200 % 100});
  }


}