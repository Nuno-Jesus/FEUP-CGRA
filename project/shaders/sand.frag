#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler1; /* uSampler1 -> sandT.jpg*/
uniform sampler2D uSampler2; /* uSampler2 -> sandM.jpg*/
uniform float timeFactor; /* used for movement*/

void main() {

	vec3 colorHelp;
	
	vec4 color = texture2D(uSampler1, vTextureCoord);  
	vec4 map = texture2D(uSampler2, vTextureCoord);

	colorHelp.r = color.r * map.r;
	colorHelp.g = color.g * map.g; 
	colorHelp.b = color.b * map.b;  
	
	color.r -= colorHelp.r * 0.4;
	color.g -= colorHelp.g * 0.4;
	color.b -= colorHelp.b * 0.4;
	
	gl_FragColor = color;
}