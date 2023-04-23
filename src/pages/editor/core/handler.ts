import type Editor from './_editor';
import { fabric } from 'fabric';

class Handler {
    constructor(editor: Editor) {
        this.editor = editor;
    }

    editor: Editor;

    // == delete ======================================================
    delete(objs: fabric.Object[]) {
        const canvas = this.editor.canvas;
        if (objs && objs.length > 0) {
            canvas.discardActiveObject();
            objs.forEach((item) => canvas.remove(item));
            canvas.renderAll();
        }
    }

    canDeleteActive() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length > 0) return activeObjects;
        return false;
    }

    deleteActive() {
        const objs = this.canDeleteActive();
        if (objs) this.delete(objs);
    }

    // == clone ======================================================
    clone(objs: fabric.Object[]) {
        const canvas = this.editor.canvas;
        if (objs && objs.length > 0) {
            canvas.discardActiveObject();
            const clones: fabric.Object[] = [];
            objs.forEach((obj) => {
                obj.clone((cloned: fabric.Object) => {
                    cloned.set({
                        // @ts-ignore
                        id: this.editor.id(),
                        customType: (obj as any).customType,
                        top: (cloned?.top || 0) + 10,
                        left: (cloned?.left || 0) + 10,
                    });
                    clones.push(cloned);
                });
            });
            const newGroup = new fabric.Group(clones);
            canvas.add(newGroup);
            canvas.setActiveObject(newGroup);
            newGroup.toActiveSelection();
            canvas.renderAll();
            return clones;
        }
        return false;
    }

    canCloneActive() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length > 0) return activeObjects;
        return false;
    }

    cloneActive() {
        const objs = this.canCloneActive();
        if (objs) this.clone(objs);
    }

    // == unGroup ======================================================
    unGroup(obj: fabric.Group) {
        const canvas = this.editor.canvas;
        obj.toActiveSelection();
        canvas.renderAll();
        this.editor.eEvent.fire('group:change');
    }

    canUnGroupActive() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length === 1) {
            if (activeObjects[0] instanceof fabric.Group) return activeObjects[0];
        }
        return false;
    }

    unGroupActive() {
        const obj = this.canUnGroupActive();
        if (obj) this.unGroup(obj);
    }

    // == group ======================================================
    group(obj: fabric.ActiveSelection) {
        const canvas = this.editor.canvas;
        const group = obj.toGroup();
        group.set({
            // @ts-ignore
            id: this.editor.id(),
            customType: 'Group',
        });
        console.log(group);
        canvas.renderAll();
        this.editor.eEvent.fire('group:change');
    }

    canGroupActive() {
        const canvas = this.editor.canvas;
        const activeObject = canvas.getActiveObject();
        if (activeObject instanceof fabric.ActiveSelection) return activeObject;
        return false;
    }

    groupActive() {
        const obj = this.canGroupActive();
        if (obj) this.group(obj);
    }

    // == up ======================================================
    up(obj: fabric.Object) {
        const canvas = this.editor.canvas;
        obj.bringForward();
        canvas.renderAll();
        this.editor.eEvent.fire('zIndex:change');
    }

    canUpActive() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length === 1) return activeObjects[0];
        return false;
    }

    upActive() {
        const obj = this.canUpActive();
        if (obj) this.up(obj);
    }

    // == upTop ======================================================
    upTop(obj: fabric.Object) {
        const canvas = this.editor.canvas;
        obj.bringToFront();
        canvas.renderAll();
        this.editor.eEvent.fire('zIndex:change');
    }

    canUpTopActive() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length === 1) return activeObjects[0];
        return false;
    }

    upTopActive() {
        const obj = this.canUpTopActive();
        if (obj) this.upTop(obj);
    }

    // == down ======================================================
    down(obj: fabric.Object) {
        const canvas = this.editor.canvas;
        const workspace = this.editor.workspace;
        obj.sendBackwards();
        workspace.getWorkspace()?.sendToBack();
        canvas.renderAll();
        this.editor.eEvent.fire('zIndex:change');
    }

    canDownActive() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length === 1) return activeObjects[0];
        return false;
    }

    downActive() {
        const obj = this.canDownActive();
        if (obj) this.down(obj);
    }

    // == downTop ======================================================
    downTop(obj: fabric.Object) {
        const canvas = this.editor.canvas;
        const workspace = this.editor.workspace;
        obj.sendToBack();
        workspace.getWorkspace()?.sendToBack();
        canvas.renderAll();
        this.editor.eEvent.fire('zIndex:change');
    }

    canDownTopActive() {
        const canvas = this.editor.canvas;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length === 1) return activeObjects[0];
        return false;
    }

    downTopActive() {
        const obj = this.canDownTopActive();
        if (obj) this.downTop(obj);
    }
}

export default Handler;
