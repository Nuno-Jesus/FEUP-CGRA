#ifdef GL_ES
precision highp float;
#endif

varying vec3 vertexPosition;

void main(){
	//Green - pink
	//vec4 color = vec4(vertexPosition.y, 1.0 - vertexPosition.y, 0.5 + vertexPosition.y/2.0, 1.0);
	
	//Green - blue
	vec4 color = vec4(0, vertexPosition.y + 0.4, vertexPosition.y + 0.1, 1.0);

	gl_FragColor = color;
}