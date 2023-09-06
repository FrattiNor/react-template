import * as dat from 'dat.gui';

type Controls = Record<string, { min: number; max: number; value: number }>;

type Props = {
    controls: Controls;
};

class Gui {
    constructor({ controls }: Props) {
        this.controls = controls;
    }

    gui = new dat.GUI();
    controls: Controls;

    destroy() {
        this.gui.destroy();
    }
}

export default Gui;
