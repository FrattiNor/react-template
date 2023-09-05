import { vertexShaderSource, fragmentShaderSource } from './data';
import { createShader, createProgram } from './utils';

const execute = (gl: WebGL2RenderingContext) => {
    // 指定将要用来清理绘图区的颜色
    gl.clearColor(1, 1, 1, 1);
    // 清理绘图区
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 顶点着色器
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    // 片元着色器
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    //
    if (vertexShader && fragmentShader) {
        console.log('shader');
        // link 顶点着色器 片元着色器
        const program = createProgram(gl, vertexShader, fragmentShader);
        //
        if (program) {
            console.log('program');
            //启动程序对象
            gl.useProgram(program);

            // 获取顶点属性 a_Position
            const a_Position = gl.getAttribLocation(program, 'a_Position');
            // 顶点数据【多份顶点数据】
            const vertices = new Float32Array([0.0, 0.1, -0.1, -0.1, 0.1, -0.1, 0.1, 0.1]);
            // 创建缓冲区
            const vertexBuffer = gl.createBuffer();
            // 绑定缓冲区
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            // 绑定缓冲数据
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            // 将缓冲区 赋予 顶点属性 a_Position
            gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
            // 开启顶点数据的批处理功能【赋予缓冲区后，将执行多次绘制，需要开启批处理】
            gl.enableVertexAttribArray(a_Position);

            // 获取片元属性 u_FragColor
            const u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
            // 设置片元属性 u_FragColor
            const color = new Float32Array([1.0, 0.0, 1.0, 1.0]);
            gl.uniform4fv(u_FragColor, color);

            // 绘制顶点
            // gl.drawArrays(gl.POINTS, 0, 4);
            // 绘制三角形
            gl.drawArrays(gl.LINE_LOOP, 0, 4);
        }
    }
};

export default execute;
