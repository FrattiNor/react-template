import type Editor from './editor';

class Guidelines {
    constructor(editor: Editor) {
        this.editor = editor;
    }

    editor: Editor;

    enable() {}
    disable() {}
}

export default Guidelines;
