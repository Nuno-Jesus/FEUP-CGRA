attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord1;
varying vec2 vTextureCoord2;

uniform sampler2D uSampler1; /* uSampler1 -> pier.jpg*/
uniform sampler2D uSampler2; /* uSampler2 -> distortionMap.jpg*/
uniform float timeFactor; /* used for movement*/


void main() {
	
	float s = aTextureCoord.s + timeFactor/100.0;
	float t = aTextureCoord.t + timeFactor/100.0;
		
	float s2 = aTextureCoord.s + texture2D(uSampler2, vec2(s, t)).r * 0.05;
	float t2 = aTextureCoord.t + texture2D(uSampler2, vec2(s, t)).g * 0.05;

	if (s2 >= 1.0)
  		s2 = 2.0 - s2;

	if (t2 >= 1.0)
  		t2 = 2.0 - t2;

	vTextureCoord1 = vec2(s2,t2);
	vTextureCoord2 = vec2(s, t);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition , 1.0);

}

