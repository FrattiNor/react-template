import { type Virtualizer } from '@react/hooks/src/useVirtualizer';

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
