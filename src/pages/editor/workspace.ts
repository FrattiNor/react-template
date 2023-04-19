import type Editor from './editor';

class Workspace {
    constructor(editor: Editor) {
        this.editor = editor;
    }

    editor: Editor;

    enable() {}

    disable() {}
}

export default Workspace;
