import type Editor from './editor';

class ZIndex {
    constructor(editor: Editor) {
        this.editor = editor;
    }

    editor: Editor;

    enable() {}
    disable() {}
}

export default ZIndex;
