import type Editor from './editor';

class Zoom {
    constructor(editor: Editor) {
        this.editor = editor;
    }

    editor: Editor;

    enable() {
        const canvas = this.editor.canvas;
        // 监听鼠标滚轮缩放事件
        canvas.on('mouse:wheel', (opt) => {
            const delta = opt.e.deltaY; // 滚轮，向上滚一下是 -100，向下滚一下是 100
            let zoom = canvas.getZoom(); // 获取画布当前缩放值
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20; // 限制最大缩放级别
            if (zoom < 0.01) zoom = 0.01; // 限制最小缩放级别
            // 以鼠标所在位置为原点缩放
            canvas.zoomToPoint(
                {
                    x: opt.e.offsetX,
                    y: opt.e.offsetY,
                },
                zoom, // 传入修改后的缩放级别
            );
        });
    }

    disable() {}
}

export default Zoom;
