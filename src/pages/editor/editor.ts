import { fabric } from 'fabric';
import Observer from './observer';

class Editor {
    constructor(canvas: HTMLCanvasElement) {
        const container = canvas.parentElement;

        this.canvas = new fabric.Canvas(canvas, {
            width: container?.clientWidth,
            height: container?.clientHeight,
        });

        this.observer = new Observer(this);
        this.observer.enable();
    }

    canvas: fabric.Canvas;
    observer: Observer;

    destroy() {
        this.observer.disable();
        this.canvas.dispose();
    }
}

export default Editor;
