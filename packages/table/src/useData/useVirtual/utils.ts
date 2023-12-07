import { Virtualizer } from '@tanstack/react-virtual';

// 横向测量变更为 不适用 Math.round, 4舍5入可能会导致宽度不一致
export const MeasureElementNotMathRound = <TItemElement extends Element>(
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
