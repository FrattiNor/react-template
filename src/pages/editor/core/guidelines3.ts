/* eslint-disable no-param-reassign */
import type Editor from './_editor';
import { AlignGuidelines } from 'fabric-guideline-plugin';

class Guidelines {
    constructor(editor: Editor) {
        this.editor = editor;
        this.maxCount = 500;
        this.visible = false;
        this.guideline = new AlignGuidelines({
            canvas: this.editor.canvas,
            aligningOptions: {
                lineColor: '#32D10A',
                lineWidth: 2,
                lineMargin: 2,
            },
        });
    }

    visible: boolean;
    editor: Editor;
    maxCount: number;
    guideline: AlignGuidelines;

    eventHandlers = {
        watchCount: this.watchCount.bind(this),
    };

    watchCount() {
        const objs = this.editor.canvas.getObjects();
        const count = objs.length;
        console.log(count);
        if (count > this.maxCount) {
            this.unActive();
        } else {
            this.active();
        }
    }

    active() {
        if (!this.visible) {
            this.visible = true;
            this.guideline.init();
        }
    }

    unActive() {
        if (this.visible) {
            this.visible = false;
            this.guideline.clearGuideline();
        }
    }

    enable() {
        this.active();
        this.editor.canvas.on('after:render', this.eventHandlers.watchCount);
    }

    disable() {
        this.unActive();
        this.editor.canvas.off('after:render', this.eventHandlers.watchCount);
    }
}

export default Guidelines;
