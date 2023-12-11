import useBodyResizeObserver from '../useBodyResizeObserver';
import useBodyScrollObserver from '../useBodyScrollObserver';
import { Virtualizer } from '@tanstack/react-virtual';

interface Rect {
    width: number;
    height: number;
}

export const observeElementRect = (key: string, bodyResizeObserver: ReturnType<typeof useBodyResizeObserver>) => {
    return <T extends Element>(instance: Virtualizer<T, any>, cb: (rect: Rect) => void) => {
        const element = instance.scrollElement;
        if (!element) {
            return;
        }

        const handler = (rect: Rect) => {
            const { width, height } = rect;
            cb({ width: Math.round(width), height: Math.round(height) });
        };

        console.log('add', key);
        bodyResizeObserver.addHandle(key, handler);

        return () => {
            console.log('remove', key);
            bodyResizeObserver.removeHandle(key);
        };
    };
};

export const observeElementOffset = (key: string, bodyScrollObserver: ReturnType<typeof useBodyScrollObserver>) => {
    return <T extends Element>(instance: Virtualizer<T, any>, cb: (offset: number) => void) => {
        const element = instance.scrollElement;
        if (!element) {
            return;
        }

        const handler = (scrollSize: { scrollLeft: number; scrollTop: number }) => {
            cb(scrollSize[instance.options.horizontal ? 'scrollLeft' : 'scrollTop']);
        };

        bodyScrollObserver.addHandle(key, handler);

        return () => {
            bodyScrollObserver.removeHandle(key);
        };
    };
};

export const measureElement = <TItemElement extends Element>(
    element: TItemElement,
    entry: ResizeObserverEntry | undefined,
    instance: Virtualizer<any, TItemElement>,
) => {
    if (entry?.borderBoxSize) {
        const box = entry.borderBoxSize[0];

        if (box) {
            const size = box[instance.options.horizontal ? 'inlineSize' : 'blockSize'];
            return size;
        }
    }

    return element.getBoundingClientRect()[instance.options.horizontal ? 'width' : 'height'];
};
