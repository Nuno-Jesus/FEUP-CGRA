attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float scaleFactor;

varying vec2 vTextureCoord;
varying vec3 vertexPosition;

void main() {
	vec3 offset = vec3(0.0, 0.0, 0.0); 
	
	vTextureCoord = aTextureCoord;
	vertexPosition = aVertexPosition;

	//Parabolic curvature of the algae (back and forth)
	offset.x = 5.0 * aVertexPosition.y * aVertexPosition.y * sin(timeFactor);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
