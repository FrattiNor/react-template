import type Editor from './_editor';

class HotKey {
    constructor(editor: Editor) {
        this.editor = editor;
    }

    editor: Editor;

    enable() {}
    disable() {}
}

export default HotKey;
