attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler1; /* uSampler1 -> waterT.jpg*/
uniform sampler2D uSampler2; /* uSampler2 -> waterM.jpg*/
uniform float timeFactor; /* used for movement*/

void main() {
	float s = aTextureCoord.s + timeFactor/100.0;
	float t = aTextureCoord.t + timeFactor/100.0;
	
	if (s > 1.0)
		s = 2.0 - s;

	if (t > 1.0)
		t = 2.0 - t;
	
	vTextureCoord = vec2(s,t);

	vec3 offset2;
	offset2= aVertexNormal* texture2D(uSampler2, vTextureCoord).b * 0.05;
	
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset2 , 1.0);

	
}

