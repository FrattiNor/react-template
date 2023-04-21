import type { IEvent } from 'fabric/fabric-impl';
import ReactDOM from 'react-dom/client';
import type Editor from '../_editor';
import { Fragment } from 'react';
import Menu from './menu';

class ContextMenu {
    constructor(editor: Editor) {
        this.editor = editor;
        this.visible = false;
        // 将容器插入到DOM
        const container = document.createElement('div');
        container.id = 'menu';
        const canvas = this.editor.canvas as any;
        const wrapper = canvas.wrapperEl as HTMLDivElement;
        wrapper?.parentElement?.appendChild(container);
        this.root = ReactDOM.createRoot(container);
    }

    editor: Editor;
    visible: boolean;
    root: ReactDOM.Root;

    eventHandlers = {
        mouseDown: this.mouseDown.bind(this),
        mouseWheel: this.mouseWheel.bind(this),
    };

    mouseDown(e: IEvent<MouseEvent>) {
        const canvas = this.editor.canvas;
        const activeObject = canvas.getActiveObjects();
        if (!activeObject.length) return this.hiddenMenu();
        if (e.button === 3 && e.target) {
            const pointX = e.pointer?.x;
            const pointY = e.pointer?.y;
            if (pointX && pointY) {
                return this.showMenu(pointX, pointY);
            }
        }
        this.hiddenMenu();
    }

    mouseWheel() {
        this.hiddenMenu();
    }

    hiddenMenu() {
        this.visible = false;
        this.root.render(<Fragment />);
    }

    showMenu(x: number, y: number) {
        this.visible = true;
        this.root.render(<Menu x={x} y={y} editor={this.editor} />);
    }

    enable() {
        this.editor.canvas.on('mouse:down', this.eventHandlers.mouseDown);
        this.editor.canvas.on('mouse:wheel', this.eventHandlers.mouseWheel);
    }

    disable() {
        this.editor.canvas.off('mouse:down', this.eventHandlers.mouseDown as any);
        this.editor.canvas.off('mouse:wheel', this.eventHandlers.mouseWheel as any);
    }
}

export default ContextMenu;
