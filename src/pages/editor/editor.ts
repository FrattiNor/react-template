import Observer from './observer';
import { fabric } from 'fabric';
import EEvent from './eEvent';
import Ruler from './ruler';
import Zoom from './zoom';
import Drag from './drag';
import Workspace from './workspace';
import Guidelines from './guidelines';

class Editor {
    constructor(canvas: HTMLCanvasElement) {
        const container = canvas.parentElement;

        this.canvas = new fabric.Canvas(canvas, {
            width: container?.clientWidth,
            height: container?.clientHeight,
        });

        this.eEvent = new EEvent();
        this.observer = new Observer(this);
        this.observer.enable();
        this.workspace = new Workspace(this);
        this.workspace.enable();
        this.zoom = new Zoom(this);
        this.zoom.enable();
        this.drag = new Drag(this);
        this.drag.enable();
        this.ruler = new Ruler(this);
        this.ruler.enable();
        this.guidelines = new Guidelines(this);
        this.guidelines.enable();
    }

    canvas: fabric.Canvas;
    observer: Observer;
    eEvent: EEvent;
    ruler: Ruler;
    zoom: Zoom;
    drag: Drag;
    workspace: Workspace;
    guidelines: Guidelines;

    destroy() {
        this.observer.disable();
        this.canvas.dispose();
    }
}

export default Editor;
