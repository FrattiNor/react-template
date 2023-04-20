import type Editor from './_editor';
import { fabric } from 'fabric';

class ActiveHandler {
    constructor(editor: Editor) {
        this.editor = editor;
    }

    editor: Editor;

    canDelete() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length > 0) return true;
        return false;
    }

    delete() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length > 0) {
            activeObjects.map((item) => canvas.remove(item));
            canvas.renderAll();
        }
    }

    canClone() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length > 0) return true;
        return false;
    }

    clone() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length > 0) {
            canvas.discardActiveObject();
            const clones: any[] = [];
            activeObjects.forEach((obj) => {
                obj.clone((cloned: any) => {
                    cloned.set({ left: cloned.left + 10, top: cloned.top + 10 });
                    clones.push(cloned);
                });
            });
            const newGroup = new fabric.Group(clones, { selectable: true });
            canvas.add(newGroup);
            canvas.setActiveObject(newGroup);
            newGroup.toActiveSelection();
            canvas.renderAll();
        }
    }

    canUnGroup() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length === 1) {
            if (activeObjects[0] instanceof fabric.Group) return true;
        }
        return false;
    }

    unGroup() {
        const canvas = this.editor.canvas;
        const activeObject = canvas.getActiveObject();
        if (activeObject instanceof fabric.Group) {
            activeObject.toActiveSelection();
            canvas.renderAll();
        }
    }

    // ====== do next
    canGroup() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length > 1) return true;
        return false;
    }

    group() {
        const canvas = this.editor.canvas;
        const activeObject = canvas.getActiveObject();
        const activeGroup = (activeObject as any).toGroup();
        const objectsInGroup = activeGroup.getObjects();
        activeGroup.clone((newGroup: any) => {
            canvas.remove(activeGroup);
            objectsInGroup.forEach((object: fabric.Object) => {
                canvas.remove(object);
            });
            canvas.add(newGroup);
            canvas.setActiveObject(newGroup);
        });
    }

    canUp() {
        return false;
    }

    up() {
        const canvas = this.editor.canvas;
        const actives = canvas.getActiveObjects();
        if (actives && actives.length === 1) {
            const activeObject = canvas.getActiveObjects()[0];
            if (activeObject) activeObject.bringForward();
            canvas.renderAll();
        }
    }

    canUpTop() {
        return false;
    }

    upTop() {
        const canvas = this.editor.canvas;
        const actives = canvas.getActiveObjects();
        if (actives && actives.length === 1) {
            const activeObject = canvas.getActiveObjects()[0];
            if (activeObject) activeObject.bringToFront();
            canvas.renderAll();
        }
    }

    canDown() {
        return false;
    }

    down() {
        const canvas = this.editor.canvas;
        const actives = canvas.getActiveObjects();
        if (actives && actives.length === 1) {
            const activeObject = canvas.getActiveObjects()[0];
            if (activeObject) activeObject.sendBackwards();
            canvas.renderAll();
        }
    }

    canDownTop() {
        return false;
    }

    downTop() {
        const canvas = this.editor.canvas;
        const actives = canvas.getActiveObjects();
        if (actives && actives.length === 1) {
            const activeObject = canvas.getActiveObjects()[0];
            if (activeObject) activeObject.sendToBack();
            canvas.renderAll();
        }
    }
}

export default ActiveHandler;
