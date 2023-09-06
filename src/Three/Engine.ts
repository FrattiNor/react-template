import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import * as STATE from 'stats.js';
import * as THREE from 'three';

type Props = {
    canvas: HTMLCanvasElement;
    background?: { r: number; g: number; b: number };
};

class Engine {
    constructor({ canvas, background }: Props) {
        // canvas
        this.canvas = canvas;
        // 场景
        this.scene = new THREE.Scene();
        if (background) this.scene.background = new THREE.Color(background.r, background.g, background.b);
        // 摄像头
        this.camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.camera.lookAt(0, 0, 0);
        // 渲染器
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.control = new PointerLockControls(this.camera, document.body);
        this.control.isLocked = true;
        console.log(this.control);
    }

    canvas: HTMLCanvasElement;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    axes = new THREE.AxesHelper(10);
    stats = new STATE();
    statsRequestAnimationFrame: number | null = null;
    control: PointerLockControls;

    showAxes() {
        this.scene.add(this.axes);
    }

    hiddenAxes() {
        this.scene.remove(this.axes);
    }

    showState() {
        document.body.appendChild(this.stats.dom);
        const animate = () => {
            this.statsRequestAnimationFrame = requestAnimationFrame(animate); // 循环调用函数
            this.stats.update(); // 更新性能插件
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    hiddenState() {
        document.body.removeChild(this.stats.dom);
        if (typeof this.statsRequestAnimationFrame === 'number') {
            cancelAnimationFrame(this.statsRequestAnimationFrame);
        }
    }

    destroy() {
        this.hiddenState();
        this.control.dispose();
    }
}

export default Engine;
