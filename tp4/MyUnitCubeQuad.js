import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js"; 


/**
 * MyCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, texTop, texFront, texRight, texBack,  texLeft, texBottom) {
		super(scene);
		this.init();
    
    this.textureTop = texTop;
    this.textureSide = texRight;
    this.textureBottom = texBottom;

    this.mat = new CGFappearance(this.scene);
    this.mat.setAmbient(0.1, 0.1, 0.1, 1);
    this.mat.setDiffuse(0.9, 0.9, 0.9, 1);
    this.mat.setSpecular(0.1, 0.1, 0.1, 1);
    this.mat.setShininess(10.0);
    this.mat.loadTexture('images/default.png');
    this.mat.setTextureWrap('REPEAT', 'REPEAT');
	}
  
  init(){
    this.frontQuad = new MyQuad(this.scene);
    this.rightQuad = new MyQuad(this.scene);
    this.backQuad = new MyQuad(this.scene);
    this.leftQuad = new MyQuad(this.scene);
    this.upperQuad = new MyQuad(this.scene);
    this.lowerQuad = new MyQuad(this.scene);
  }
    

  display(){
    //  // this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    
      this.scene.pushMatrix();
      this.scene.translate(0, 0, 0.5);
      this.mat.setTexture(this.textureSide);
      this.mat.apply();
      if(this.scene.interpolationLin)
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
      else
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.frontQuad.display();
      this.scene.popMatrix();
      
      this.scene.pushMatrix();
      this.scene.translate(0.5, 0, 0);
      this.scene.rotate(Math.PI/2.0, 0, 1, 0);
      this.mat.apply();
      if(this.scene.interpolationLin)
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
      else
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.rightQuad.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.5);
      this.scene.rotate(-Math.PI, 0, 1, 0);
      this.mat.apply();
      if(this.scene.interpolationLin)
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
      else
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.backQuad.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-0.5, 0, 0);
      this.scene.rotate(-Math.PI/2.0, 0, 1, 0);
      this.mat.apply();
      if(this.scene.interpolationLin)
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
      else
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.leftQuad.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, 0.5, 0);
      this.scene.rotate(-Math.PI/2.0, 1, 0, 0);
      this.mat.setTexture(this.textureTop);
      this.mat.apply();
      if(this.scene.interpolationLin)
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
      else
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.upperQuad.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, -0.5, 0);
      this.scene.rotate(Math.PI/2.0, 1, 0, 0);
      this.mat.setTexture(this.textureBottom);
      this.mat.apply();
      if(this.scene.interpolationLin)
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
      else
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.lowerQuad.display();
      this.scene.popMatrix();
    }
  }