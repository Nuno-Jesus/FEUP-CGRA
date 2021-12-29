#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vertexPosition;
uniform sampler2D uSampler1;

uniform float R;
uniform float G;
uniform float B;

void main() {
    vec4 color = texture2D(uSampler1, vTextureCoord);
    
    //It would be obvious to use the coordinate Z instead of X, but 
    //because we a made a rotation in Y axis, the coordinates shifted
    if(vertexPosition.x <= -0.16){
        color = vec4(R/255.0, G/255.0, B/255.0, 1.0);
    }
    
    gl_FragColor = color;
}
