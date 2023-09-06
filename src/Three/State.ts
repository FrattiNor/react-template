import * as STATE from 'stats.js';

class State {
    constructor() {
        this.showState();
    }

    stats = new STATE();
    timeout: number | null = null;

    showState() {
        document.body.appendChild(this.stats.dom);
        const animate = () => {
            this.timeout = requestAnimationFrame(animate); // 循环调用函数
            this.stats.update(); // 更新性能插件
        };
        animate();
    }

    hiddenState() {
        if (typeof this.timeout === 'number') {
            cancelAnimationFrame(this.timeout);
        }
        document.body.removeChild(this.stats.dom);
    }

    destroy() {
        this.hiddenState();
    }
}

export default State;
