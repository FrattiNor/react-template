import type Editor from './_editor';

class HotKey {
    constructor(editor: Editor) {
        this.editor = editor;
        this.copyItems = false;
    }

    editor: Editor;
    copyItems: false | fabric.Object[];

    eventHandlers = {
        keyDown: this.keyDown.bind(this),
    };

    keyDown(e: KeyboardEvent) {
        if (e.key === 'Backspace' || e.code === 'Backspace' || e.keyCode === 8) {
            this.backspace();
        }
        if (e.ctrlKey) {
            if (e.key === 'c' || e.code === 'KeyC' || e.keyCode === 67) {
                this.ctrlC();
            }
            if (e.key === 'v' || e.code === 'KeyV' || e.keyCode === 86) {
                this.ctrlV();
            }
            if (e.key === 'z' || e.code === 'KeyZ' || e.keyCode === 90) {
                this.ctrlZ();
            }
            if (e.key === 'x' || e.code === 'KeyX') {
                this.ctrlX();
            }
        }
    }

    ctrlC() {
        this.copyItems = this.editor.handler.canCloneActive();
    }

    ctrlV() {
        if (this.copyItems) {
            this.copyItems = this.editor.handler.clone(this.copyItems);
        }
    }

    backspace() {
        this.editor.handler.deleteActive();
    }

    ctrlZ() {
        this.editor.history.back();
    }

    ctrlX() {
        this.editor.history.next();
    }

    enable() {
        document.addEventListener('keydown', this.eventHandlers.keyDown);
    }

    disable() {
        document.removeEventListener('keydown', this.eventHandlers.keyDown);
    }
}

export default HotKey;
