import type Editor from './_editor';

class ZIndex {
    constructor(editor: Editor) {
        this.editor = editor;
    }

    editor: Editor;

    enable() {}
    disable() {}
}

export default ZIndex;
