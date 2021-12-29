import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js"; 


/**
 * MyCubeMap
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param texTop - Top plane texture 
 * @param texBottom - Bottom plane texture 
 * @param texLeft - Left plane texture 
 * @param texFront - Front plane texture 
 * @param texRight -  Right plane texture 
 * @param texBack - Back plane texture 
 */
export class MyCubeMap extends CGFobject {
	constructor(scene, texTop, texBottom, texLeft, texFront, texRight, texBack) {
		super(scene);
		this.init();
    
    this.textureTop = texTop;
    this.textureBottom = texBottom;
    this.textureLeft = texLeft;
    this.textureFront = texFront;
    this.textureRight = texRight;
    this.textureBack = texBack;

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
      //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    
      this.scene.pushMatrix();
      this.scene.translate(0, 0, 0.5);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.mat.setTexture(this.textureBack);
      this.mat.apply();
      this.frontQuad.display();
      this.scene.popMatrix();
      
      this.scene.pushMatrix();
      this.scene.translate(0.5, 0, 0);
      this.scene.rotate(Math.PI/2.0, 0, 1, 0);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.mat.setTexture(this.textureRight);
      this.mat.apply();
      this.rightQuad.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.5);
      this.scene.rotate(-Math.PI, 0, 1, 0);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.mat.setTexture(this.textureFront);
      this.mat.apply();
      this.backQuad.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-0.5, 0, 0);
      this.scene.rotate(-Math.PI/2.0, 0, 1, 0);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.mat.setTexture(this.textureLeft);
      this.mat.apply();
      this.leftQuad.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, 0.5, 0);
      this.scene.rotate(-Math.PI/2.0, 1, 0, 0);
      this.scene.rotate(Math.PI, 1, 0, 0);
      this.mat.setTexture(this.textureTop);
      this.mat.apply();
      this.upperQuad.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, -0.5, 0);
      this.scene.rotate(Math.PI/2.0, 1, 0, 0);
      this.scene.rotate(Math.PI, 1, 0, 0);
      this.mat.setTexture(this.textureBottom);
      this.mat.apply();
      this.lowerQuad.display();
      this.scene.popMatrix();
    }
  }