import Controller from './controller';
import Guidelines from './guidelines2';
import Workspace from './workspace';
import Alignment from './alignment';
import Observer from './observer';
import { fabric } from 'fabric';
import ZIndex from './zIndex';
import EEvent from './eEvent';
import Ruler from './ruler';
import Zoom from './zoom';
import Drag from './drag';

class Editor {
    constructor(element: HTMLCanvasElement) {
        const container = element.parentElement;

        this.canvas = new fabric.Canvas(element, {
            width: container?.clientWidth,
            height: container?.clientHeight,
        });

        this.eEvent = new EEvent();
        this.ruler = new Ruler(this);
        this.ruler.enable();
        this.workspace = new Workspace(this);
        this.workspace.enable();
        this.zoom = new Zoom(this);
        this.zoom.enable();
        this.drag = new Drag(this);
        this.drag.enable();
        this.guidelines = new Guidelines(this);
        this.guidelines.enable();
        // this.guidelines.disable();
        this.alignment = new Alignment(this);
        this.alignment.enable();
        this.controller = new Controller(this);
        this.controller.enable();
        this.zIndex = new ZIndex(this);
        this.zIndex.enable();
        this.observer = new Observer(this);
        this.observer.enable();
    }

    canvas: fabric.Canvas;
    observer: Observer;
    eEvent: EEvent;
    ruler: Ruler;
    zoom: Zoom;
    drag: Drag;
    workspace: Workspace;
    guidelines: Guidelines;
    alignment: Alignment;
    controller: Controller;
    zIndex: ZIndex;

    destroy() {
        this.observer.disable();
        this.canvas.dispose();
    }
}

export default Editor;
