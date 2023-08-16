export const vertexShaderSource = `
attribute vec4 a_Position;

void main(){
    gl_Position = a_Position;
    gl_PointSize = 50.0;
}
`;

export const fragmentShaderSource = `
void main() {
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}
`;
