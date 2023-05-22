import { linear } from './timing';

type Draw = (progress: number) => void;
type Timing = (progress: number) => number;
type Props = { draw: Draw; duration: number; timing?: Timing; autoPlay?: boolean };

class JsAnimate {
    constructor({ draw, duration, timing, autoPlay }: Props) {
        this.draw = draw;
        this.duration = duration;
        this.timing = timing ?? linear;
        if (autoPlay ?? true) {
            this.play();
        }
    }

    draw: Draw;
    timing: Timing;
    duration: number;
    timeout: null | number = null;
    startTime = 0;

    judge() {
        // 判断浏览器支持
        if (window.performance) {
            return true;
        } else {
            console.error('您的浏览器不支持 performance 接口');
            return false;
        }
    }

    animate() {
        const nowTime = window.performance.now();
        const progress = Math.min((nowTime - this.startTime) / this.duration, 1);
        if (progress >= 0 && progress <= 1) {
            const timingProgress = this.timing(progress);
            this.draw(timingProgress);
            if (progress !== 1) {
                this.timeout = window.requestAnimationFrame(this.animate.bind(this));
            }
        }
    }

    play() {
        if (this.judge()) {
            this.draw(0);
            this.startTime = window.performance.now();
            this.timeout = window.requestAnimationFrame(this.animate.bind(this));
        }
    }

    destroy() {
        if (typeof this.timeout === 'number') {
            window.cancelAnimationFrame(this.timeout);
        }
    }
}

export default JsAnimate;
