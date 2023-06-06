import { fabric } from 'fabric';
import type Editor from './_editor';

class Workspace {
    constructor(editor: Editor) {
        this.editor = editor;
        this.height = 1080;
        this.width = 1920;
        this.padding = 40;
        this.customType = 'Workspace';
        this.id = 'Workspace';
    }

    id: string;
    customType: string;
    editor: Editor;
    width: number;
    height: number;
    padding: number;

    getWorkspace() {
        return this.editor.canvas.getObjects().find(({ id }: any) => id === this.id);
    }

    autoZoom() {
        const canvasWidth = this.editor.canvas.width || 0;
        const canvasHeight = this.editor.canvas.height || 0;
        const workspace = this.getWorkspace();
        if (canvasWidth && canvasHeight && workspace) {
            const zoom1 = (canvasWidth - 2 * this.padding) / this.width;
            const zoom2 = (canvasHeight - 2 * this.padding) / this.height;
            const zoom = Math.min(Math.min(zoom1, zoom2), 1);
            this.editor.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
            const center = this.editor.canvas.getCenter();
            // 将workspace中心对齐canvas中心
            const workspaceCenter = workspace.getCenterPoint();
            const workspaceMoveLeft = center.left - workspaceCenter.x;
            if (typeof workspace.left === 'number') workspace.set('left', workspace.left + workspaceMoveLeft);
            const workspaceMoveTop = center.top - workspaceCenter.y;
            if (typeof workspace.top === 'number') workspace.set('top', workspace.top + workspaceMoveTop);
            // 以canvas中心进行缩放
            this.editor.canvas.zoomToPoint({ x: center.left, y: center.top }, zoom);
        }
    }

    enable() {
        this.editor.canvas.add(
            new fabric.Rect({
                // @ts-ignore 自定义属性
                id: this.id,
                customType: this.customType,
                top: 0,
                left: 0,
                selectable: false,
                width: this.width,
                height: this.height,
                hoverCursor: 'default',
                moveCursor: 'pointer',
                fill: 'rgb(255,255,255)',
            }),
        );

        this.autoZoom();
    }

    disable() {
        const workspace = this.getWorkspace();
        if (workspace) this.editor.canvas.remove(workspace);
    }
}

export default Workspace;
