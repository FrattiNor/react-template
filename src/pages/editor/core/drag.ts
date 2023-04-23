import type { IEvent } from 'fabric/fabric-impl';
import type Editor from './_editor';

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

    eventHandlers = {
        mouseDown: this.mouseDown.bind(this),
        mouseMove: this.mouseMove.bind(this),
        mouseUp: this.mouseUp.bind(this),
    };

    mouseDown(opt: IEvent<MouseEvent>) {
        const evt = opt.e;
        if (evt.altKey === true) {
            this.isDragging = true;
            this.editor.canvas.selection = false;
            this.lastPosX = evt.clientX;
            this.lastPosY = evt.clientY;
        }
    }

    mouseMove(opt: IEvent<MouseEvent>) {
        if (this.isDragging) {
            const e = opt.e;
            const canvas = this.editor.canvas;
            const vpt = canvas.viewportTransform;

            if (vpt) {
                vpt[4] += e.clientX - this.lastPosX;
                vpt[5] += e.clientY - this.lastPosY;
                this.lastPosX = e.clientX;
                this.lastPosY = e.clientY;
                canvas.renderAll();
            }
        }
    }

    mouseUp() {
        if (this.isDragging) {
            const canvas = this.editor.canvas;
            canvas.selection = true;
            this.isDragging = false;
            canvas.setViewportTransform(canvas.viewportTransform as any);
            canvas.renderAll();
        }
    }

    enable() {
        this.editor.canvas.on('mouse:down', this.eventHandlers.mouseDown);
        this.editor.canvas.on('mouse:move', this.eventHandlers.mouseMove);
        this.editor.canvas.on('mouse:up', this.eventHandlers.mouseUp);
    }

    disable() {
        this.editor.canvas.off('mouse:down', this.eventHandlers.mouseDown as any);
        this.editor.canvas.off('mouse:move', this.eventHandlers.mouseMove as any);
        this.editor.canvas.off('mouse:up', this.eventHandlers.mouseUp as any);
    }
}

export default Drag;
