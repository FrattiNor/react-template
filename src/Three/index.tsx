import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import Engine from './Engine';

// 定义对象，设置需要修改的数据
const controls = {
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    cameraX: 2,
    cameraY: 1,
    cameraZ: 5,
};

const Three = () => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (ref.current) {
            const engine = new Engine({ canvas: ref.current, background: { r: 0.1, g: 0.1, b: 0.1 } });
            engine.showAxes();
            engine.showState();
            // cube
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshNormalMaterial(); // 创建法线网格材质
            const cube = new THREE.Mesh(geometry, material);
            engine.scene.add(cube);

            const updatePosition = () => {
                cube.position.set(controls.positionX, controls.positionY, controls.positionZ);
                engine.camera.position.set(controls.cameraX, controls.cameraY, controls.cameraZ);
                // engine.camera.lookAt(cube.position);
                // engine.render();
            };

            updatePosition();
            // gui
            const gui = new dat.GUI();
            gui.add(controls, 'positionX', -1, 1).onChange(updatePosition);
            gui.add(controls, 'positionY', -1, 1).onChange(updatePosition);
            gui.add(controls, 'positionZ', -1, 1).onChange(updatePosition);
            gui.add(controls, 'cameraX', -10, 10).onChange(updatePosition);
            gui.add(controls, 'cameraY', -10, 10).onChange(updatePosition);
            gui.add(controls, 'cameraZ', -10, 10).onChange(updatePosition);

            return () => {
                gui.destroy();
                engine.destroy();
            };
        }
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', padding: 50 }}>
            <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
    );
};

export default Three;
