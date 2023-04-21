import type Editor from './_editor';

class Layer {
    constructor(editor: Editor) {
        this.editor = editor;
        this.objs = [];
    }

    editor: Editor;
    objs: fabric.Object[];

    eventHandlers = {
        watchChange: this.watchChange.bind(this),
    };

    watchChange() {
        console.log('watchChange');
        console.log(this.editor.canvas.getObjects());
        console.log(this.objs === this.editor.canvas.getObjects());
        this.objs = this.editor.canvas.getObjects();
    }

    enable() {
        this.editor.canvas.on('object:added', this.eventHandlers.watchChange);
        this.editor.canvas.on('object:removed', this.eventHandlers.watchChange);
        this.editor.eEvent.on('zIndex:change', this.eventHandlers.watchChange);
    }

    disable() {
        this.editor.canvas.off('after:added', this.eventHandlers.watchChange);
        this.editor.canvas.off('after:removed', this.eventHandlers.watchChange);
        this.editor.eEvent.off('zIndex:change', this.eventHandlers.watchChange);
    }
}

export default Layer;
