import type { BodyResizeObserver } from '../useBodyResizeObserver';
import type { BodyScrollObserver } from '../useBodyScrollObserver';
import type { Virtualizer } from '@react/hooks/src/useVirtualizer';

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

        bodyResizeObserver.addListener(key, handler);

        return () => {
            bodyResizeObserver.removeListener(key);
        };
    };
};

export const observeElementOffset = (key: string, bodyScrollObserver: BodyScrollObserver, type: 'horizontal' | 'vertical') => {
    return <T extends Element>(instance: Virtualizer<T, any>, cb: (offset: number) => void) => {
        const element = instance.scrollElement;
        if (!element) {
            return;
        }

        const handler = (scrollSize: { scrollLeft: number; scrollTop: number }) => {
            cb(scrollSize[instance.options.horizontal ? 'scrollLeft' : 'scrollTop']);
        };

        bodyScrollObserver.addListener(key, handler, type);

        return () => {
            bodyScrollObserver.removeListener(key, type);
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
