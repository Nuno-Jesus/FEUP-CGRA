#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler1; /* uSampler1 -> pier.jpg*/
uniform sampler2D uSampler2; /* uSampler2 -> distortionmap.jpg*/
uniform float timeFactor; /* used for movement*/

void main() {

	vec3 colorHelp;
	
	vec4 color = texture2D(uSampler1, vTextureCoord);  /* water texture */
	vec4 map = texture2D(uSampler2, vTextureCoord);	/* water map -> need to use this in order to achieve some sort of depth*/	

	colorHelp.r = color.r * map.r;
	colorHelp.g = color.g * map.g; 
	colorHelp.b = color.b * map.b;  
	
	color.r -= colorHelp.r * 0.4;
	color.g -= colorHelp.g * 0.4;
	color.b -= colorHelp.b * 0.4;
	
	gl_FragColor = color;
}