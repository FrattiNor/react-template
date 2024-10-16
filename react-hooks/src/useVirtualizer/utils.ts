import { type Virtualizer } from '@tanstack/react-virtual';

export const measureElement = <TItemElement extends Element>(
	element: TItemElement,
	entry: ResizeObserverEntry | undefined,
	instance: Virtualizer<any, TItemElement>,
) => {
	if (entry?.borderBoxSize) {
		const box = entry.borderBoxSize[0];
		if (box) {
			const size = Math.floor(box[instance.options.horizontal ? 'inlineSize' : 'blockSize']);
			return size;
		}
	}
	return Math.floor(element.getBoundingClientRect()[instance.options.horizontal ? 'width' : 'height']);
};
