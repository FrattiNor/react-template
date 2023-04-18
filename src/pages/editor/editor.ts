import Observer from './observer';
import { fabric } from 'fabric';
import EEvent from './eEvent';
import Ruler from './ruler';
import Zoom from './zoom';
import Drag from './drag';

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
        this.ruler = new Ruler(this);
        this.ruler.enable();
        this.zoom = new Zoom(this);
        this.zoom.enable();
        this.drag = new Drag(this);
        this.drag.enable();
    }

    canvas: fabric.Canvas;
    observer: Observer;
    eEvent: EEvent;
    ruler: Ruler;
    zoom: Zoom;
    drag: Drag;

    destroy() {
        this.observer.disable();
        this.canvas.dispose();
    }
}

export default Editor;
