export const vertexShaderSource = `
attribute vec4 a_Position;

void main() {
    gl_Position = a_Position;
    gl_PointSize = 20.0;
}
`;

export const fragmentShaderSource = `
precision mediump float;
uniform vec4 u_FragColor;

void main() {
    // distance 计算两个点位的距离
    // gl_PointCoord 片元在一个点中的位置，此位置是被归一化的
    float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
    if(dist <= 0.5) {
        gl_FragColor = u_FragColor;
    } else {
        // discard 丢弃，即不会一个片元进行渲染
        discard;
    }
}
`;

export const fragmentShaderSource2 = `
precision mediump float;
uniform vec4 u_FragColor;

void main() {
    gl_FragColor = u_FragColor;
}
`;
