import ContextMenu from './contextMenu';
import Guidelines from './guidelines3';
import Controller from './controller';
import Workspace from './workspace';
import Alignment from './alignment';
import Observer from './observer';
import { fabric } from 'fabric';
import Handler from './handler';
import HotKey from './hotKey';
import EEvent from './eEvent';
import Ruler from './ruler';
import Zoom from './zoom';
import Drag from './drag';
import History from './history';
import Drop from './drop';

class Editor {
    constructor(element: HTMLCanvasElement) {
        const container = element.parentElement;

        this.canvas = new fabric.Canvas(element, {
            width: container?.clientWidth,
            height: container?.clientHeight,
            fireRightClick: true, // 启用右键，button的数字为3
            stopContextMenu: true, // 禁止默认右键菜单
            controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
            preserveObjectStacking: true, // 选中时保持原有层级
        });

        this.eEvent = new EEvent();
        this.handler = new Handler(this);
        this.alignment = new Alignment(this);

        this.ruler = new Ruler(this);
        this.ruler.enable();
        this.workspace = new Workspace(this);
        this.workspace.enable();
        this.zoom = new Zoom(this);
        this.zoom.enable();
        this.drag = new Drag(this);
        this.drag.enable();
        // this.guidelines = new Guidelines(this);
        // this.guidelines.enable();
        this.controller = new Controller(this);
        this.controller.enable();
        this.observer = new Observer(this);
        this.observer.enable();
        this.contextMenu = new ContextMenu(this);
        this.contextMenu.enable();
        this.history = new History(this);
        this.history.enable();
        this.hotKey = new HotKey(this);
        this.hotKey.enable();
        this.drop = new Drop(this);
        this.drop.enable();

        // 挂载到windows
        (window as any)['__editor__'] = this;
    }

    canvas: fabric.Canvas;
    observer: Observer;
    eEvent: EEvent;
    ruler: Ruler;
    zoom: Zoom;
    drag: Drag;
    workspace: Workspace;
    // guidelines: Guidelines;
    alignment: Alignment;
    controller: Controller;
    handler: Handler;
    contextMenu: ContextMenu;
    hotKey: HotKey;
    history: History;
    drop: Drop;

    toJSON() {
        return this.canvas.toJSON(['id', 'selectable', 'hoverCursor', 'perPixelTargetFind']);
    }

    destroy() {
        this.contextMenu.disable();
        this.observer.disable();
        this.hotKey.disable();
        this.canvas.dispose();
    }
}

export default Editor;
