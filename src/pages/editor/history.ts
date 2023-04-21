import type Editor from './_editor';

class History {
    constructor(editor: Editor) {
        this.editor = editor;
        this.history = [];
        this.index = -1;
        this.maxStep = 50;
        this.needSave = true;
    }

    history: Record<string, any>[];
    maxStep: number;
    editor: Editor;
    index: number;
    needSave: boolean;

    eventHandlers = {
        save: this.save.bind(this),
    };

    // 保存
    save() {
        if (this.needSave) {
            if (this.index !== this.history.length - 1) {
                this.history.length = this.index + 1;
            }
            this.history.push(this.editor.toJSON());
            if (this.history.length > this.maxStep) {
                this.history.reverse();
                this.history.length = this.maxStep;
                this.history.reverse();
            }
            this.index = this.history.length - 1;
        }
    }

    canBack() {
        return this.history.length > 0 && this.index > 0;
    }

    // 后退
    back() {
        if (this.canBack()) {
            this.index -= 1;
            this.needSave = false;
            this.editor.canvas.loadFromJSON(this.history[this.index], () => {});
            this.needSave = true;
        }
    }

    canNext() {
        return this.history.length > 0 && this.index < this.history.length - 1;
    }

    // 前进
    next() {
        if (this.canNext()) {
            this.index += 1;
            this.needSave = false;
            this.editor.canvas.loadFromJSON(this.history[this.index], () => {});
            this.needSave = true;
        }
    }

    enable() {
        this.save();
        this.editor.canvas.on('object:modified', this.eventHandlers.save);
        this.editor.canvas.on('object:added', this.eventHandlers.save);
        this.editor.canvas.on('object:removed', this.eventHandlers.save);
    }

    disable() {
        this.editor.canvas.off('object:modified', this.eventHandlers.save);
        this.editor.canvas.off('object:added', this.eventHandlers.save);
        this.editor.canvas.off('object:removed', this.eventHandlers.save);
    }
}

export default History;
