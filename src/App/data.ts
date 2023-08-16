export const vertexShaderSource = `
attribute vec4 a_Position;

void main() {
    gl_Position = a_Position;
    gl_PointSize = 50.0;
}
`;

export const fragmentShaderSource = `
precision mediump float;
uniform vec4 u_FragColor;

void main() {
    gl_FragColor = u_FragColor;
}
`;
