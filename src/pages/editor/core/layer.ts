import type Editor from './_editor';

class Layer {
    constructor(editor: Editor) {
        this.editor = editor;
        this.objs = [];
        this.activeObjs = [];
    }

    editor: Editor;
    activeObjs: fabric.Object[];
    objs: fabric.Object[];

    eventHandlers = {
        objsChange: this.objsChange.bind(this),
        activeObjsChange: this.activeObjsChange.bind(this),
    };

    objsChange() {
        this.objs = this.editor.canvas.getObjects();
        this.editor.eEvent.fire('layer:change', this.objs);
    }

    activeObjsChange() {
        this.objs = this.editor.canvas.getActiveObjects();
        this.editor.eEvent.fire('activeLayer:change', this.objs);
    }

    enable() {
        this.editor.canvas.on('selection:created', this.eventHandlers.activeObjsChange);
        this.editor.canvas.on('selection:updated', this.eventHandlers.activeObjsChange);
        this.editor.canvas.on('selection:cleared', this.eventHandlers.activeObjsChange);

        this.editor.canvas.on('object:added', this.eventHandlers.objsChange);
        this.editor.canvas.on('object:removed', this.eventHandlers.objsChange);
        this.editor.eEvent.on('zIndex:change group:change', this.eventHandlers.objsChange);
    }

    disable() {
        this.editor.canvas.off('selection:created', this.eventHandlers.activeObjsChange);
        this.editor.canvas.off('selection:updated', this.eventHandlers.activeObjsChange);
        this.editor.canvas.off('selection:cleared', this.eventHandlers.activeObjsChange);

        this.editor.canvas.off('after:added', this.eventHandlers.objsChange);
        this.editor.canvas.off('after:removed', this.eventHandlers.objsChange);
        this.editor.eEvent.off('zIndex:change group:change', this.eventHandlers.objsChange);
    }
}

export default Layer;
