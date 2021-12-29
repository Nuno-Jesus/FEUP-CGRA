#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord1;
varying vec2 vTextureCoord2;

uniform sampler2D uSampler1; /* uSampler1 -> pier.jpg*/
uniform sampler2D uSampler2; /* uSampler2 -> distortionmap.png*/
uniform float timeFactor; /* used for movement*/

void main() {
    vec2 distortion = vTextureCoord1;
    vec4 map = texture2D (uSampler2, vTextureCoord2);

    distortion.s += map.r * 0.4;
    distortion.t += map.g * 0.4 - 0.15;

    if (distortion.s > 1.0)
  		distortion.s = 2.0 - distortion.s;

	if (distortion.t > 1.0)
  		distortion.t = 2.0 - distortion.t;


    vec4 color = texture2D (uSampler1, distortion);  

    gl_FragColor = color;
}