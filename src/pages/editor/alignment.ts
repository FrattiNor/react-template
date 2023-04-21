import type Editor from './_editor';
import { fabric } from 'fabric';

class Alignment {
    constructor(editor: Editor) {
        this.editor = editor;
    }

    editor: Editor;

    canAlign() {
        const activeObject = this.editor.canvas.getActiveObject();
        if (activeObject instanceof fabric.ActiveSelection) return activeObject;
        return false;
    }

    // 左对齐
    leftAlign() {
        const activeObject = this.editor.canvas.getActiveObject();
        if (activeObject instanceof fabric.ActiveSelection) {
            const activeObjectLeft = -((activeObject?.width || 0) / 2);
            activeObject.forEachObject((item) => {
                item.set({ left: activeObjectLeft });
                item.setCoords();
            });
            this.editor.canvas.renderAll();
        }
    }

    // 右对齐
    rightAlign() {
        const activeObject = this.editor.canvas.getActiveObject();
        if (activeObject instanceof fabric.ActiveSelection) {
            const activeObjectLeft = (activeObject?.width || 0) / 2;
            activeObject.forEachObject((item) => {
                item.set({ left: activeObjectLeft - (item?.width || 0) * (item?.scaleX || 0) });
                item.setCoords();
            });
            this.editor.canvas.renderAll();
        }
    }

    // 水平居中对齐
    xCenterAlign() {
        const activeObject = this.editor.canvas.getActiveObject();
        if (activeObject instanceof fabric.ActiveSelection) {
            activeObject.forEachObject((item) => {
                item.set({ left: 0 - ((item?.width || 0) * (item?.scaleX || 0)) / 2 });
                item.setCoords();
            });
            this.editor.canvas.renderAll();
        }
    }

    // 垂直居中对齐
    yCenterAlign() {
        const activeObject = this.editor.canvas.getActiveObject();
        if (activeObject instanceof fabric.ActiveSelection) {
            activeObject.forEachObject((item) => {
                item.set({ top: 0 - ((item?.height || 0) * (item?.scaleY || 0)) / 2 });
                item.setCoords();
            });
            this.editor.canvas.renderAll();
        }
    }

    // 顶部对齐
    TopAlign() {
        const activeObject = this.editor.canvas.getActiveObject();
        if (activeObject instanceof fabric.ActiveSelection) {
            const activeObjectTop = -((activeObject?.height || 0) / 2);
            activeObject.forEachObject((item) => {
                item.set({ top: activeObjectTop });
                item.setCoords();
            });
            this.editor.canvas.renderAll();
        }
    }

    // 底部对齐
    BottomAlign() {
        const activeObject = this.editor.canvas.getActiveObject();
        if (activeObject instanceof fabric.ActiveSelection) {
            const activeObjectTop = (activeObject?.height || 0) / 2;
            activeObject.forEachObject((item) => {
                item.set({ top: activeObjectTop - (item?.height || 0) * (item?.scaleY || 0) });
                item.setCoords();
            });
            this.editor.canvas.renderAll();
        }
    }

    // 水平平均分布
    xAverageAlign() {
        const activeObject = this.editor.canvas.getActiveObject();
        if (activeObject instanceof fabric.ActiveSelection) {
            const objs = activeObject.getObjects();
            objs.sort((a, b) => (a.left || 0) - (b.left || 0));
            const widths: number[] = [];
            objs.forEach((item) => widths.push(item?.width || 0));
            const count = widths.length;
            if (count > 1) {
                const totalWidth = widths.reduce((a, b) => a + b, 0);
                const distance = ((activeObject.width || 0) - totalWidth) / (count - 1);
                const activeObjectLeft = -((activeObject?.width || 0) / 2);
                const beforeWidth: number[] = [];
                objs.forEach((item, i) => {
                    if (i === 0) {
                        beforeWidth.push(activeObjectLeft + (item.width || 0) * (item.scaleX || 0));
                        item.set({ left: activeObjectLeft });
                        item.setCoords();
                    } else {
                        beforeWidth.push(beforeWidth[i - 1] + distance + (item.width || 0) * (item.scaleX || 0));
                        item.set({ left: beforeWidth[i - 1] + distance });
                        item.setCoords();
                    }
                });
                this.editor.canvas.renderAll();
            }
        }
    }

    // 垂直平均分布
    yAverageAlign() {
        const activeObject = this.editor.canvas.getActiveObject();
        if (activeObject instanceof fabric.ActiveSelection) {
            const objs = activeObject.getObjects();
            objs.sort((a, b) => (a.top || 0) - (b.top || 0));
            const heights: number[] = [];
            objs.forEach((item) => heights.push(item?.height || 0));
            const count = heights.length;
            if (count > 1) {
                const totalHeight = heights.reduce((a, b) => a + b, 0);
                const distance = ((activeObject.height || 0) - totalHeight) / (count - 1);
                const activeObjectTop = -((activeObject?.height || 0) / 2);
                const beforeHeight: number[] = [];
                objs.forEach((item, i) => {
                    if (i === 0) {
                        beforeHeight.push(activeObjectTop + (item.height || 0) * (item.scaleY || 0));
                        item.set({ top: activeObjectTop });
                        item.setCoords();
                    } else {
                        beforeHeight.push(beforeHeight[i - 1] + distance + (item.height || 0) * (item.scaleY || 0));
                        item.set({ top: beforeHeight[i - 1] + distance });
                        item.setCoords();
                    }
                });
                this.editor.canvas.renderAll();
            }
        }
    }
}

export default Alignment;
