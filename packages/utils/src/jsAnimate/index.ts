import { linear } from './timing';

type OnEnd = () => void;
type Draw = (progress: number, cancel: () => void) => void;
export type Timing = (progress: number) => number;
type Props = { draw: Draw; duration: number; timing?: Timing; autoPlay?: boolean; onEnd?: OnEnd };

class JsAnimate {
    constructor({ draw, duration, timing, autoPlay, onEnd }: Props) {
        this.draw = draw;
        this.duration = duration;
        this.onEnd = onEnd ?? null;
        this.timing = timing ?? linear;
        if (autoPlay ?? true) {
            this.play();
        }
    }

    draw: Draw;
    timing: Timing;
    duration: number;
    onEnd: null | OnEnd = null;
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
            this.draw(timingProgress, this.destroy);
            if (progress < 1) {
                this.timeout = window.requestAnimationFrame(this.animate.bind(this));
            } else if (typeof this.onEnd === 'function') {
                this.timeout = window.requestAnimationFrame(this.onEnd);
            }
        }
    }

    play() {
        if (this.judge()) {
            this.draw(0, this.destroy);
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
