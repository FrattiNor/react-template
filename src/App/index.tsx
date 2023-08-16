import { useEffect, useRef } from 'react';
import execute from './execute';

const App = () => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvasEl = ref.current;
        if (canvasEl) {
            canvasEl.width = canvasEl.clientWidth; // 设置 canvas 画布的宽度
            canvasEl.height = canvasEl.clientHeight; // 设置 canvas 画布的高度
            const gl = canvasEl.getContext('webgl2');
            if (gl) execute(gl);
        }
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '50%', height: '50%', border: '1px solid #8c8c8c' }}>
                <canvas style={{ width: '100%', height: '100%' }} ref={ref} />
            </div>
        </div>
    );
};

export default App;
