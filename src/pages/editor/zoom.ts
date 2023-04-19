import type { IEvent } from 'fabric/fabric-impl';
import type Editor from './editor';

class Zoom {
    constructor(editor: Editor) {
        this.editor = editor;
    }

    editor: Editor;

    eventHandlers = {
        mouseWheel: this.mouseWheel.bind(this),
    };

    mouseWheel(opt: IEvent<WheelEvent>) {
        const canvas = this.editor.canvas;
        const delta = opt.e.deltaY; // 滚轮，向上滚一下是 -100，向下滚一下是 100
        let zoom = canvas.getZoom(); // 获取画布当前缩放值
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20; // 限制最大缩放级别
        if (zoom < 0.01) zoom = 0.01; // 限制最小缩放级别
        // 以鼠标所在位置为原点缩放
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    }

    enable() {
        this.editor.canvas.on('mouse:wheel', this.eventHandlers.mouseWheel);
    }

    disable() {
        this.editor.canvas.off('mouse:wheel', this.eventHandlers.mouseWheel as any);
    }
}

export default Zoom;
