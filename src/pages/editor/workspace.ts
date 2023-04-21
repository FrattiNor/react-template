import { fabric } from 'fabric';
import type Editor from './_editor';

class Workspace {
    constructor(editor: Editor) {
        this.editor = editor;
        this.height = 1080;
        this.width = 1920;
        this.padding = 40;
        this.id = 'workspace';
        this.workspace = new fabric.Rect({
            // @ts-ignore 自定义属性
            id: this.id,
            top: 0,
            left: 0,
            selectable: false,
            width: this.width,
            height: this.height,
            hoverCursor: 'default',
            moveCursor: 'pointer',
            fill: 'rgb(255,255,255)',
        });
    }

    id: string;
    editor: Editor;
    workspace: fabric.Rect;
    width: number;
    height: number;
    padding: number;

    getWorkspace() {
        return this.editor.canvas.getObjects().find(({ id }: any) => id === this.id);
    }

    autoZoom() {
        const canvasWidth = this.editor.canvas.width || 0;
        const canvasHeight = this.editor.canvas.height || 0;
        if (canvasWidth && canvasHeight) {
            const zoom1 = (canvasWidth - 2 * this.padding) / this.width;
            const zoom2 = (canvasHeight - 2 * this.padding) / this.height;
            const zoom = Math.min(zoom1, zoom2);
            this.editor.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
            const center = this.editor.canvas.getCenter();
            this.editor.canvas.zoomToPoint({ x: center.left, y: center.top }, zoom);
            this.editor.canvas.centerObject(this.workspace);
        }
    }

    changeRulerOffset() {
        const canvasWidth = this.editor.canvas.width || 0;
        const canvasHeight = this.editor.canvas.height || 0;
        if (canvasWidth && canvasHeight) {
            this.editor.ruler.offsetX = (canvasWidth - this.width) / 2;
            this.editor.ruler.offsetY = (canvasHeight - this.height) / 2;
        }
    }

    enable() {
        this.editor.canvas.add(this.workspace);
        this.autoZoom();
    }

    disable() {
        this.editor.canvas.remove(this.workspace);
    }
}

export default Workspace;
