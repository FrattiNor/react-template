import type Editor from './_editor';

class Observer {
    constructor(editor: Editor) {
        this.editor = editor;
        this.ob = null;
    }

    editor: Editor;
    ob: ResizeObserver | null;

    enable() {
        const canvas = this.editor.canvas as any;
        const workspace = this.editor.workspace;
        const wrapper = canvas.wrapperEl as HTMLDivElement;
        const container = wrapper?.parentElement;
        this.ob = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const { height, width } = entry.contentRect;
                canvas.setDimensions({ width, height });
                workspace.autoZoom();
                canvas.renderAll();
            });
        });

        if (container) this.ob.observe(container);
    }

    disable() {
        if (this.ob) {
            this.ob.disconnect();
            this.ob = null;
        }
    }
}

export default Observer;
