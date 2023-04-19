import type Editor from './editor';

class Alignment {
    constructor(editor: Editor) {
        this.editor = editor;
    }

    editor: Editor;

    enable() {}
    disable() {}
}

export default Alignment;
