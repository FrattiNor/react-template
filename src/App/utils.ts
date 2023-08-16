// 创建着色器方法，输入参数：渲染上下文，着色器类型，数据源
export function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
    const shader = gl.createShader(type); // 创建着色器对象
    if (shader) {
        gl.shaderSource(shader, source); // 提供数据源
        gl.compileShader(shader); // 编译 -> 生成着色器
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) return shader;
    }
    gl.deleteShader(shader);
}

export function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = gl.createProgram();
    if (program) {
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) return program;
    }
    gl.deleteProgram(program);
}
