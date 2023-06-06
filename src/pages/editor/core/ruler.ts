import type Editor from './_editor';
import { drawLine, drawMask, drawRect, drawText, getGap } from './rulerUtils';

type Vpt = [number, number, number, number, number, number];

class Ruler {
    constructor(editor: Editor) {
        this.editor = editor;
        this.visible = false;
        this.backgroundColor = '#fff';
        this.textColor = '#888';
        this.highlightColor = '#007fff';
        this.borderColor = '#ddd';
        this.size = 20;
        this.maskAddSize = 10;
        this.fontSize = 12;
    }

    editor: Editor;
    visible: boolean; // 是否显示
    backgroundColor: string; // 背景色
    textColor: string; // 字体色
    highlightColor: string; // 高亮色
    borderColor: string; // 边框色
    size: number; // 尺子尺寸
    maskAddSize: number; // 遮罩额外尺寸
    fontSize: number; // 字体大小

    eventHandlers = {
        afterRender: this.afterRender.bind(this),
    };

    afterRender() {
        this.draw();
    }

    toFixed(n: number) {
        return Number(n.toFixed(2));
    }

    draw() {
        const vpt = this.editor.canvas.viewportTransform as [number, number, number, number, number, number];
        const height = this.editor.canvas.height as number;
        const width = this.editor.canvas.width as number;
        const ctx = this.editor.canvas.getContext();
        const hZoom = vpt[0];
        const vZoom = vpt[3];
        const xMove = this.toFixed(vpt[4]) - this.toFixed((width * (1 - hZoom)) / 2);
        const yMove = this.toFixed(vpt[5]) - this.toFixed((height * (1 - vZoom)) / 2);
        const hGap = getGap(hZoom);
        const vGap = getGap(vZoom);
        const xCenter = this.editor.canvas.getCenter().left;
        const yCenter = this.editor.canvas.getCenter().top;
        // 横向尺子
        drawRect(ctx, {
            left: this.size,
            top: 0,
            width: width - this.size,
            height: this.size,
            fill: this.backgroundColor,
            stroke: this.borderColor,
        });

        const hLength = width / hZoom;
        const hStart = -(xMove + xCenter) / hZoom;
        const hStartValue = Math[hStart > 0 ? 'floor' : 'ceil'](hStart / hGap) * hGap;
        for (let i = hStartValue; i < hLength + hStart; i += hGap) {
            drawLine(ctx, {
                left: (i - hStart) * hZoom,
                top: (this.size * 2) / 3,
                width: 0,
                height: this.size / 3,
                stroke: this.textColor,
            });
            drawText(ctx, {
                text: `${i}`,
                left: (i - hStart) * hZoom,
                top: 2,
                fill: this.textColor,
                fontSize: this.fontSize,
                align: 'center',
            });
        }

        // 纵向尺子
        drawRect(ctx, {
            left: 0,
            top: this.size,
            width: this.size,
            height: height,
            fill: this.backgroundColor,
            stroke: this.borderColor,
        });

        const vLength = height / vZoom;
        const vStart = -(yMove + yCenter) / vZoom;
        const vStartValue = Math[vStart > 0 ? 'floor' : 'ceil'](vStart / vGap) * vGap;
        for (let i = vStartValue; i < vLength + vStart; i += vGap) {
            drawLine(ctx, {
                left: (this.size * 2) / 3,
                top: (i - vStart) * vZoom + 1,
                width: this.size / 3,
                height: 0,
                stroke: this.textColor,
            });
            drawText(ctx, {
                text: `${i}`,
                left: 2,
                top: (i - vStart) * vZoom,
                fill: this.textColor,
                fontSize: this.fontSize,
                align: 'center',
                angle: -90,
            });
        }

        // 左上角遮罩
        drawMask(ctx, {
            isHorizontal: true,
            left: -this.maskAddSize,
            top: -this.maskAddSize,
            width: this.size + this.maskAddSize * 2,
            height: this.size + this.maskAddSize,
            backgroundColor: this.backgroundColor,
        });
        drawMask(ctx, {
            isHorizontal: false,
            left: -this.maskAddSize,
            top: -this.maskAddSize,
            width: this.size + this.maskAddSize,
            height: this.size + this.maskAddSize * 2,
            backgroundColor: this.backgroundColor,
        });
    }

    enable() {
        this.editor.canvas.on('after:render', this.eventHandlers.afterRender);
        this.draw();
    }

    disable() {
        this.editor.canvas.off('after:render', this.eventHandlers.afterRender);
    }
}

export default Ruler;
