import { Virtualizer } from '@tanstack/react-virtual';

import { BodyResizeObserver } from '../useBodyResizeObserver';
import { BodyScrollObserver } from '../useBodyScrollObserver';

interface Rect {
    width: number;
    height: number;
}

export const observeElementRect = (key: string, bodyResizeObserver: BodyResizeObserver) => {
    return <T extends Element>(instance: Virtualizer<T, any>, cb: (rect: Rect) => void) => {
        const element = instance.scrollElement;
        if (!element) {
            return;
        }

        const handler = (rect: Rect) => {
            const { width, height } = rect;
            if (!(width === 0 && height === 0)) {
                cb({ width: Math.round(width), height: Math.round(height) });
            }
        };

        bodyResizeObserver.addHandle(key, handler);

        return () => {
            bodyResizeObserver.removeHandle(key);
        };
    };
};

export const observeElementOffset = (key: string, bodyScrollObserver: BodyScrollObserver) => {
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

            return Math.max(1, size);
        }
    }

    const size = element.getBoundingClientRect()[instance.options.horizontal ? 'width' : 'height'];

    return Math.max(1, size);
};
