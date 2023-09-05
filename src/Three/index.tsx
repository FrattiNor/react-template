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
                engine.camera.lookAt(cube.position);
                engine.render();
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

        // if (ref.current) {
        //     const scene = new THREE.Scene();
        //     scene.background = new THREE.Color(0.1, 0.1, 0.1);

        //     const camera = new THREE.PerspectiveCamera(50, ref.current.clientWidth / ref.current.clientHeight, 0.1, 1000);
        //     camera.position.set(controls.cameraX, controls.cameraY, controls.cameraZ);

        //     const renderer = new THREE.WebGLRenderer({ canvas: ref.current });
        //     renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);

        //     const geometry = new THREE.BoxGeometry();
        //     const material = new THREE.MeshStandardMaterial({
        //         color: new THREE.Color(1, 1, 1),
        //         metalness: 0.8,
        //     }); // 创建法线网格材质
        //     const cube = new THREE.Mesh(geometry, material);
        //     cube.position.set(controls.positionX, controls.positionY, controls.positionZ);
        //     camera.lookAt(cube.position);
        //     scene.add(cube);

        //     // 创建光源
        //     const spotLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 10);
        //     // 设置光源位置
        //     spotLight.position.set(controls.cameraX, controls.cameraY, controls.cameraZ);
        //     // 将光源添加到场景中
        //     scene.add(spotLight);

        //     var axes = new THREE.AxesHelper(4); // 坐标系轴长设置为 4
        //     scene.add(axes);

        //     renderer.render(scene, camera);

        //     if (fatherRef.current) {
        //         const gui = new dat.GUI();
        //         const updatePosition = () => {
        //             cube.position.set(controls.positionX, controls.positionY, controls.positionZ);
        //             camera.position.set(controls.cameraX, controls.cameraY, controls.cameraZ);
        //             spotLight.position.set(controls.cameraX, controls.cameraY, controls.cameraZ);
        //             camera.lookAt(cube.position);
        //             renderer.render(scene, camera);
        //         };

        //         gui.add(controls, 'positionX', -1, 1).onChange(updatePosition);
        //         gui.add(controls, 'positionY', -1, 1).onChange(updatePosition);
        //         gui.add(controls, 'positionZ', -1, 1).onChange(updatePosition);
        //         gui.add(controls, 'cameraX', -10, 10).onChange(updatePosition);
        //         gui.add(controls, 'cameraY', -10, 10).onChange(updatePosition);
        //         gui.add(controls, 'cameraZ', -10, 10).onChange(updatePosition);

        //         const stats = new STATE();
        //         fatherRef.current.appendChild(stats.dom);

        //         const animate = () => {
        //             requestAnimationFrame(animate); // 循环调用函数
        //             stats.update(); // 更新性能插件
        //         };

        //         animate();

        //         return () => {
        //             gui.destroy();
        //             fatherRef.current?.removeChild(stats.dom);
        //         };
        //     }
        // }
    }, []);

    return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />;
};

export default Three;
