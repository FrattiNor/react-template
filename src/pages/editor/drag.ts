import type Editor from './editor';

class Drag {
    constructor(editor: Editor) {
        this.editor = editor;
        this.isDragging = false;
        this.lastPosX = 0;
        this.lastPosY = 0;
    }

    editor: Editor;
    isDragging: boolean;
    lastPosX: number;
    lastPosY: number;

    enable() {
        const canvas = this.editor.canvas;

        // 按下鼠标事件
        canvas.on('mouse:down', (opt) => {
            const evt = opt.e;
            if (evt.altKey === true) {
                this.isDragging = true;
                this.lastPosX = evt.clientX;
                this.lastPosY = evt.clientY;
            }
        });

        // 移动鼠标事件
        canvas.on('mouse:move', (opt) => {
            if (this.isDragging) {
                const e = opt.e;
                const vpt = canvas.viewportTransform;

                if (vpt) {
                    vpt[4] += e.clientX - this.lastPosX;
                    vpt[5] += e.clientY - this.lastPosY;
                    canvas.requestRenderAll();
                    this.lastPosX = e.clientX;
                    this.lastPosY = e.clientY;
                }
            }
        });

        // 松开鼠标事件
        canvas.on('mouse:up', () => {
            this.isDragging = false;
        });
    }

    disable() {}
}

export default Drag;
