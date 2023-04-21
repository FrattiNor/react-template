import type { IEvent } from 'fabric/fabric-impl';
import type Editor from './_editor';

class Drop {
    constructor(editor: Editor) {
        this.editor = editor;
        this.dropItem = null;
    }

    editor: Editor;
    dropItem: fabric.Object | null;

    eventHandlers = {
        drop: this.drop.bind(this),
    };

    drop(opt: IEvent<MouseEvent>) {
        if (this.dropItem) {
            const { left, top } = this.editor.canvas.getSelectionElement().getBoundingClientRect();
            const pointerVpt = this.editor.canvas.restorePointerVpt({ x: opt.e.x - left, y: opt.e.y - top });
            this.dropItem.set('top', pointerVpt.y);
            this.dropItem.set('left', pointerVpt.x);
            this.editor.canvas.add(this.dropItem);
            this.dropItem = null;
        }
    }

    enable() {
        this.editor.canvas.on('drop', this.eventHandlers.drop);
    }

    disable() {
        this.editor.canvas.on('drop', this.eventHandlers.drop);
    }
}

export default Drop;
