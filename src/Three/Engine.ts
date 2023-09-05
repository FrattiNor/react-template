import * as THREE from 'three';
import * as STATE from 'stats.js';

type Props = {
    canvas: HTMLCanvasElement;
    background?: { r: number; g: number; b: number };
};

class Engine {
    constructor({ canvas, background }: Props) {
        // 场景
        this.scene = new THREE.Scene();
        if (background) this.scene.background = new THREE.Color(background.r, background.g, background.b);
        // 摄像头
        this.camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        // 渲染器
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    axes = new THREE.AxesHelper(10);
    stats = new STATE();
    statsRequestAnimationFrame: number | null = null;

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    showAxes() {
        this.scene.add(this.axes);
        this.render();
    }

    hiddenAxes() {
        this.scene.remove(this.axes);
        this.render();
    }

    showState() {
        document.body.appendChild(this.stats.dom);
        const animate = () => {
            this.statsRequestAnimationFrame = requestAnimationFrame(animate); // 循环调用函数
            this.stats.update(); // 更新性能插件
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
    }
}

export default Engine;
