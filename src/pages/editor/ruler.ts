import type Editor from './editor';
import { fabric } from 'fabric';

type Vpt = [number, number, number, number, number, number];

class Ruler {
    constructor(editor: Editor) {
        this.editor = editor;
        this.rulerGroup = null;
        this.visible = false;
        this.backgroundColor = '#fff';
        this.textColor = '#888';
        this.highlightColor = '#007fff';
        this.size = 20;
        this.maskAddSize = 10;
        this.gapSize = 100;
        this.vpt = [1, 0, 0, 1, 0, 0];
    }

    editor: Editor;
    rulerGroup: fabric.Group | null;
    visible: boolean;
    backgroundColor: string;
    textColor: string;
    highlightColor: string;
    size: number;
    maskAddSize: number;
    gapSize: number;
    vpt: Vpt;

    compareVpt(vpt1: Vpt, vpt2: Vpt) {
        if (vpt1[0] !== vpt2[0] || vpt1[1] !== vpt2[1] || vpt1[2] !== vpt2[2] || vpt1[3] !== vpt2[3] || vpt1[4] !== vpt2[4] || vpt1[5] !== vpt2[5]) {
            return true;
        }
        return false;
    }

    enable() {
        if (this.rulerGroup === null) {
            const width = this.editor.canvas.width ?? 0;
            const height = this.editor.canvas.height ?? 0;

            // 横向尺
            const hRuler = new fabric.Rect({
                top: 0,
                left: this.size,
                width: width - this.size,
                height: this.size,
                fill: this.backgroundColor,
            });

            // 纵向尺
            const vRuler = new fabric.Rect({
                top: this.size,
                left: 0,
                width: this.size,
                height: height - this.size,
                fill: this.backgroundColor,
            });

            // 横向遮挡
            const hMask = new fabric.Rect({
                top: -this.maskAddSize,
                left: -this.maskAddSize,
                width: 2 * this.maskAddSize + this.size,
                height: this.maskAddSize + this.size,
                fill: this.backgroundColor,
            });

            // 纵向遮挡
            const vMask = new fabric.Rect({
                top: -this.maskAddSize,
                left: -this.maskAddSize,
                width: this.maskAddSize + this.size,
                height: 2 * this.maskAddSize + this.size,
                fill: this.backgroundColor,
            });

            // 横标尺刻度线
            const hScalesMarks = [];
            for (let j = this.size + 1; j < width - this.size; j += this.gapSize) {
                hScalesMarks.push(
                    new fabric.Line([j, this.size, j, (this.size * 2) / 3], {
                        stroke: this.textColor,
                    }),
                );
            }

            // 横标尺刻度线
            const vScalesMarks = [];
            for (let j = this.size + 1; j < height - this.size; j += this.gapSize) {
                vScalesMarks.push(
                    new fabric.Line([this.size, j, (this.size * 2) / 3, j], {
                        stroke: this.textColor,
                    }),
                );
            }

            // 横标尺刻度
            const hScales = [];
            for (let j = this.size + 1; j < width - this.size; j += this.gapSize) {
                hScales.push(
                    new fabric.Text(`${Math.floor(j / this.gapSize) * this.gapSize}`, {
                        top: (1 / 3) * this.size,
                        left: j,
                        fontSize: 10,
                        originX: 'center',
                        originY: 'center',
                    }),
                );
            }

            // 纵标尺刻度
            const vScales = [];
            for (let j = this.size + 1; j < height - this.size; j += this.gapSize) {
                vScales.push(
                    new fabric.Text(`${Math.floor(j / this.gapSize) * this.gapSize}`, {
                        top: j,
                        left: (1 / 3) * this.size,
                        fontSize: 10,
                        originY: 'center',
                        originX: 'center',
                        angle: -90,
                    }),
                );
            }

            this.rulerGroup = new fabric.Group([vMask, hMask, vRuler, hRuler, ...hScalesMarks, ...vScalesMarks, ...hScales, ...vScales], {
                selectable: false,
            });

            this.editor.canvas.add(this.rulerGroup);

            this.rulerGroup.bringToFront();

            this.editor.canvas.on('after:render', () => {
                const vpt = this.editor.canvas.viewportTransform as Vpt;
                if (this.rulerGroup && vpt && this.compareVpt(vpt, this.vpt)) {
                    this.vpt = vpt;
                    this.editor.canvas.requestRenderAll();
                }
            });
        }
    }

    disable() {}
}

export default Ruler;
