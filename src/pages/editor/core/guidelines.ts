import type Editor from './_editor';
import { fabric } from 'fabric';

type VLines = {
    x: number;
    y1: number;
    y2: number;
};

type HLines = {
    y: number;
    x1: number;
    x2: number;
};

class Guidelines {
    constructor(editor: Editor) {
        this.editor = editor;
        this.closeLength = 8;
        this.sorption = true;
        this.vLines = [];
        this.hLines = [];
    }

    editor: Editor;
    closeLength: number;
    sorption: boolean;
    vLines: VLines[];
    hLines: HLines[];

    eventHandlers = {
        objectMoving: this.objectMoving.bind(this),
        afterRender: this.afterRender.bind(this),
        mouseUp: this.mouseUp.bind(this),
    };

    objectMoving(e: fabric.IEvent<MouseEvent>) {
        const currentObject = e.target;
        const canvas = this.editor.canvas;
        const viewportTransform = this.editor.canvas.viewportTransform;
        let haveVLine = false;
        let haveHLine = false;

        if (currentObject && viewportTransform) {
            const [currentX_1, currentX_2, currentX_3, currentY_1, currentY_2, currentY_3] = this.getObjectInfo(currentObject, viewportTransform);
            const currentX_halfWidth = currentX_2 - currentX_1;
            const currentX_halfHeight = currentY_2 - currentY_1;

            // 检查对象是否与其他对象对齐，如果是，则显示辅助线
            canvas.forEachObject((obj) => {
                if (obj === currentObject) {
                    return;
                }

                const [objX_1, objX_2, objX_3, objY_1, objY_2, objY_3] = this.getObjectInfo(obj, viewportTransform);

                // centerX坐标 centerX坐标
                if (this.isClose(currentX_2, objX_2)) {
                    haveVLine = true;
                    this.vLines.push({
                        x: objX_2,
                        y1: Math.min(currentY_1, currentY_3, objY_1, objY_3) - 5,
                        y2: Math.max(currentY_1, currentY_3, objY_1, objY_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(objX_2, currentY_2), 'center', 'center');
                }
                // centerX坐标 leftX坐标
                if (this.isClose(currentX_2, objX_1)) {
                    haveVLine = true;
                    this.vLines.push({
                        x: objX_1,
                        y1: Math.min(currentY_1, currentY_3, objY_1, objY_3) - 5,
                        y2: Math.max(currentY_1, currentY_3, objY_1, objY_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(objX_1, currentY_2), 'center', 'center');
                }
                // centerX坐标 rightX坐标
                if (this.isClose(currentX_2, objX_3)) {
                    haveVLine = true;
                    this.vLines.push({
                        x: objX_3,
                        y1: Math.min(currentY_1, currentY_3, objY_1, objY_3) - 5,
                        y2: Math.max(currentY_1, currentY_3, objY_1, objY_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(objX_3, currentY_2), 'center', 'center');
                }

                // leftX坐标 centerX坐标
                if (this.isClose(currentX_1, objX_2)) {
                    haveVLine = true;
                    this.vLines.push({
                        x: objX_2,
                        y1: Math.min(currentY_1, currentY_3, objY_1, objY_3) - 5,
                        y2: Math.max(currentY_1, currentY_3, objY_1, objY_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(objX_2 + currentX_halfWidth, currentY_2), 'center', 'center');
                }
                // leftX坐标 leftX坐标
                if (this.isClose(currentX_1, objX_1)) {
                    haveVLine = true;
                    this.vLines.push({
                        x: objX_1,
                        y1: Math.min(currentY_1, currentY_3, objY_1, objY_3) - 5,
                        y2: Math.max(currentY_1, currentY_3, objY_1, objY_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(objX_1 + currentX_halfWidth, currentY_2), 'center', 'center');
                }
                // leftX坐标 rightX坐标
                if (this.isClose(currentX_1, objX_3)) {
                    haveVLine = true;
                    this.vLines.push({
                        x: objX_3,
                        y1: Math.min(currentY_1, currentY_3, objY_1, objY_3) - 5,
                        y2: Math.max(currentY_1, currentY_3, objY_1, objY_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(objX_3 + currentX_halfWidth, currentY_2), 'center', 'center');
                }

                // rightX坐标 centerX坐标
                if (this.isClose(currentX_3, objX_2)) {
                    haveVLine = true;
                    this.vLines.push({
                        x: objX_2,
                        y1: Math.min(currentY_1, currentY_3, objY_1, objY_3) - 5,
                        y2: Math.max(currentY_1, currentY_3, objY_1, objY_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(objX_2 - currentX_halfWidth, currentY_2), 'center', 'center');
                }
                // rightX坐标 leftX坐标
                if (this.isClose(currentX_3, objX_1)) {
                    haveVLine = true;
                    this.vLines.push({
                        x: objX_1,
                        y1: Math.min(currentY_1, currentY_3, objY_1, objY_3) - 5,
                        y2: Math.max(currentY_1, currentY_3, objY_1, objY_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(objX_1 - currentX_halfWidth, currentY_2), 'center', 'center');
                }
                // rightX坐标 rightX坐标
                if (this.isClose(currentX_3, objX_3)) {
                    haveVLine = true;
                    this.vLines.push({
                        x: objX_3,
                        y1: Math.min(currentY_1, currentY_3, objY_1, objY_3) - 5,
                        y2: Math.max(currentY_1, currentY_3, objY_1, objY_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(objX_3 - currentX_halfWidth, currentY_2), 'center', 'center');
                }

                // centerY坐标 centerY坐标
                if (this.isClose(currentY_2, objY_2)) {
                    haveHLine = true;
                    this.hLines.push({
                        y: objY_2,
                        x1: Math.min(currentX_1, currentX_3, objX_1, objX_3) - 5,
                        x2: Math.max(currentX_1, currentX_3, objX_1, objX_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(currentX_2, objY_2), 'center', 'center');
                }
                // centerY坐标 topY坐标
                if (this.isClose(currentY_2, objY_1)) {
                    haveHLine = true;
                    this.hLines.push({
                        y: objY_1,
                        x1: Math.min(currentX_1, currentX_3, objX_1, objX_3) - 5,
                        x2: Math.max(currentX_1, currentX_3, objX_1, objX_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(currentX_2, objY_1), 'center', 'center');
                }
                // centerY坐标 bottomY坐标
                if (this.isClose(currentY_2, objY_3)) {
                    haveHLine = true;
                    this.hLines.push({
                        y: objY_3,
                        x1: Math.min(currentX_1, currentX_3, objX_1, objX_3) - 5,
                        x2: Math.max(currentX_1, currentX_3, objX_1, objX_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(currentX_2, objY_3), 'center', 'center');
                }

                // topY坐标 centerY坐标
                if (this.isClose(currentY_1, objY_2)) {
                    haveHLine = true;
                    this.hLines.push({
                        y: objY_2,
                        x1: Math.min(currentX_1, currentX_3, objX_1, objX_3) - 5,
                        x2: Math.max(currentX_1, currentX_3, objX_1, objX_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(currentX_2, objY_2 + currentX_halfHeight), 'center', 'center');
                }
                // topY坐标 topY坐标
                if (this.isClose(currentY_1, objY_1)) {
                    haveHLine = true;
                    this.hLines.push({
                        y: objY_1,
                        x1: Math.min(currentX_1, currentX_3, objX_1, objX_3) - 5,
                        x2: Math.max(currentX_1, currentX_3, objX_1, objX_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(currentX_2, objY_1 + currentX_halfHeight), 'center', 'center');
                }
                // topY坐标 bottomY坐标
                if (this.isClose(currentY_1, objY_3)) {
                    haveHLine = true;
                    this.hLines.push({
                        y: objY_3,
                        x1: Math.min(currentX_1, currentX_3, objX_1, objX_3) - 5,
                        x2: Math.max(currentX_1, currentX_3, objX_1, objX_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(currentX_2, objY_3 + currentX_halfHeight), 'center', 'center');
                }

                // bottomY坐标 centerY坐标
                if (this.isClose(currentY_3, objY_2)) {
                    haveHLine = true;
                    this.hLines.push({
                        y: objY_2,
                        x1: Math.min(currentX_1, currentX_3, objX_1, objX_3) - 5,
                        x2: Math.max(currentX_1, currentX_3, objX_1, objX_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(currentX_2, objY_2 - currentX_halfHeight), 'center', 'center');
                }
                // bottomY坐标 topY坐标
                if (this.isClose(currentY_3, objY_1)) {
                    haveHLine = true;
                    this.hLines.push({
                        y: objY_1,
                        x1: Math.min(currentX_1, currentX_3, objX_1, objX_3) - 5,
                        x2: Math.max(currentX_1, currentX_3, objX_1, objX_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(currentX_2, objY_1 - currentX_halfHeight), 'center', 'center');
                }
                // bottomY坐标 bottomY坐标
                if (this.isClose(currentY_3, objY_3)) {
                    haveHLine = true;
                    this.hLines.push({
                        y: objY_3,
                        x1: Math.min(currentX_1, currentX_3, objX_1, objX_3) - 5,
                        x2: Math.max(currentX_1, currentX_3, objX_1, objX_3) + 5,
                    });
                    if (this.sorption) currentObject.setPositionByOrigin(new fabric.Point(currentX_2, objY_3 - currentX_halfHeight), 'center', 'center');
                }
            });

            if (!haveHLine) {
                this.hLines.length = 0;
            }

            if (!haveVLine) {
                this.vLines.length = 0;
            }
        }
    }

    afterRender() {
        console.log(this.vLines[0]);
        for (let i = this.vLines.length; i--; ) {
            this.drawVerticalLine(this.vLines[i]);
        }
        for (let j = this.hLines.length; j--; ) {
            this.drawHorizontalLine(this.hLines[j]);
        }
        this.vLines.length = 0;
        this.hLines.length = 0;
    }

    drawVerticalLine(coords: VLines) {
        this.drawLine(coords.x + 0.5, coords.y1 > coords.y2 ? coords.y2 : coords.y1, coords.x + 0.5, coords.y2 > coords.y1 ? coords.y2 : coords.y1);
    }

    drawHorizontalLine(coords: HLines) {
        this.drawLine(coords.x1 > coords.x2 ? coords.x2 : coords.x1, coords.y + 0.5, coords.x2 > coords.x1 ? coords.x2 : coords.x1, coords.y + 0.5);
    }

    drawLine(x1: number, y1: number, x2: number, y2: number) {
        const ctx = this.editor.canvas.getSelectionContext();
        const viewportTransform = this.editor.canvas.viewportTransform;
        if (viewportTransform) {
            const zoom = viewportTransform[0];
            ctx.save();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgb(0,255,0)';
            ctx.beginPath();
            ctx.moveTo(x1 * zoom + viewportTransform[4], y1 * zoom + viewportTransform[5]);
            ctx.lineTo(x2 * zoom + viewportTransform[4], y2 * zoom + viewportTransform[5]);
            ctx.stroke();
            ctx.restore();
        }
    }

    mouseUp() {
        this.vLines.length = 0;
        this.hLines.length = 0;
        this.editor.canvas.renderAll();
    }

    isClose(num1: number, num2: number) {
        if (this.sorption) {
            return Math.abs(num1 - num2) < this.closeLength;
        }
        return num1 === num2;
    }

    getObjectInfo(obj: fabric.Object, viewportTransform: number[]) {
        const objCenter = obj.getCenterPoint();
        const objBoundingRect = obj.getBoundingRect();
        const objHeight = objBoundingRect.height / viewportTransform[3];
        const objWidth = objBoundingRect.width / viewportTransform[0];
        const objX_1 = objCenter.x - objWidth / 2;
        const objX_2 = objCenter.x;
        const objX_3 = objCenter.x + objWidth / 2;
        const objY_1 = objCenter.y - objHeight / 2;
        const objY_2 = objCenter.y;
        const objY_3 = objCenter.y + objHeight / 2;

        return [objX_1, objX_2, objX_3, objY_1, objY_2, objY_3];
    }

    enable() {
        this.editor.canvas.on('object:moving', this.eventHandlers.objectMoving);
        this.editor.canvas.on('after:render', this.eventHandlers.afterRender);
        this.editor.canvas.on('mouse:up', this.eventHandlers.mouseUp);
    }

    disable() {
        this.editor.canvas.off('object:moving', this.eventHandlers.objectMoving as any);
        this.editor.canvas.off('after:render', this.eventHandlers.afterRender as any);
        this.editor.canvas.off('mouse:up', this.eventHandlers.mouseUp as any);
    }
}

export default Guidelines;
