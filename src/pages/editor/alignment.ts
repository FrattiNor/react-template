import type Editor from './_editor';

class Alignment {
    constructor(editor: Editor) {
        this.editor = editor;
    }

    editor: Editor;

    enable() {}
    disable() {}
}

export default Alignment;
