import type { IEvent } from 'fabric/fabric-impl';
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

    eventHandlers = {
        mouseDown: this.mouseDown.bind(this),
        mouseMove: this.mouseMove.bind(this),
        mouseUp: this.mouseUp.bind(this),
    };

    mouseDown(opt: IEvent<MouseEvent>) {
        const evt = opt.e;
        if (evt.altKey === true) {
            this.isDragging = true;
            this.lastPosX = evt.clientX;
            this.lastPosY = evt.clientY;
        }
    }

    mouseMove(opt: IEvent<MouseEvent>) {
        const canvas = this.editor.canvas;
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
    }

    mouseUp() {
        this.isDragging = false;
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
