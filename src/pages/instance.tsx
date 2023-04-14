type Drag = { isDragging: boolean; lastX: number; lastY: number };

interface FabricInstance {
    // 实例
    instance: fabric.Canvas;
    // 拖拽变量
    drag: Drag;
}

class FabricInstance {
    constructor(instance: fabric.Canvas) {
        this.instance = instance;
    }

    drag = {
        isDragging: false,
        lastX: 0,
        lastY: 0,
    };
}

export default FabricInstance;
