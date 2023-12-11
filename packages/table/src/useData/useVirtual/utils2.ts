import { Virtualizer } from '@tanstack/react-virtual';

interface Rect {
    width: number;
    height: number;
}

export const observeElementRect1 = <T extends Element>(instance: Virtualizer<T, any>, cb: (rect: Rect) => void) => {
    const element = instance.scrollElement;
    if (!element) {
        return;
    }

    const handler = (rect: Rect) => {
        const { width, height } = rect;
        cb({ width: Math.round(width), height: Math.round(height) });
    };

    handler(element.getBoundingClientRect());

    const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry?.borderBoxSize) {
            const box = entry.borderBoxSize[0];
            if (box) {
                handler({ width: box.inlineSize, height: box.blockSize });
                return;
            }
        }
        handler(element.getBoundingClientRect());
    });

    observer.observe(element, { box: 'border-box' });

    return () => {
        observer.unobserve(element);
    };
};

export const observeElementOffset1 = <T extends Element>(instance: Virtualizer<T, any>, cb: (offset: number) => void) => {
    const element = instance.scrollElement;
    if (!element) {
        return;
    }

    const handler = () => {
        cb(element[instance.options.horizontal ? 'scrollLeft' : 'scrollTop']);
    };
    handler();

    element.addEventListener('scroll', handler, {
        passive: true,
    });

    return () => {
        element.removeEventListener('scroll', handler);
    };
};
