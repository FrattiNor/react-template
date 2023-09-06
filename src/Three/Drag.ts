import Engine from './Engine';

class Drag {
    constructor(engine: Engine) {
        this.engine = engine;
    }

    engine: Engine;
    status: boolean = false;
    x: number = 0;
    y: number = 0;

    mouseDown = ((e: MouseEvent) => {
        this.status = true;
        this.x = e.pageX;
        this.y = e.pageY;
        console.log(this.x, this.y, 1);
    }).bind(this);

    mouseMove = ((e: MouseEvent) => {
        if (this.status === true) {
            const moveX = e.pageX - this.x;
            const moveY = e.pageY - this.y;
            console.log(moveX, moveY);
        }
    }).bind(this);

    mouseUp = ((e: MouseEvent) => {
        const moveX = e.pageX - this.x;
        const moveY = e.pageY - this.y;
        console.log(moveX, moveY);
        this.status = false;
    }).bind(this);

    enable() {
        this.engine.canvas.addEventListener('mousedown', this.mouseDown);
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    }

    disable() {
        this.engine.canvas.removeEventListener('mousedown', this.mouseDown);
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('mouseup', this.mouseUp);
    }
}

export default Drag;
