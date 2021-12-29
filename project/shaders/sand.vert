attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler1; /* uSampler1 -> sand */
uniform sampler2D uSampler2; /* uSampler2 -> sandMap */
uniform float maxHeight;

void main() {
	float s = aTextureCoord.s;
	float t = aTextureCoord.t; 
	
	if (s > 1.0)
		s = 2.0 - s;

	if (t > 1.0)
		t = 2.0 - t;
	
	vTextureCoord = vec2(s,t);

	vec3 offset = aVertexNormal * texture2D(uSampler2, vTextureCoord).b * 0.08;
	vec3 newVertexPosition = aVertexPosition + offset;
	
	if(newVertexPosition.y > maxHeight)
		newVertexPosition.y = maxHeight;
	
	gl_Position = uPMatrix * uMVMatrix * vec4(newVertexPosition, 1.0);

	
}

