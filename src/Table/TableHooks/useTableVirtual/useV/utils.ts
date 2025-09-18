import { type Virtualizer } from '@tanstack/react-virtual';

import { FixedTwo } from '../../../TableUtils';

// 保持最小size为1，避免display:none后itemSize为0永远无法显示
export const measureElement = <TItemElement extends Element>(
	element: TItemElement,
	entry: ResizeObserverEntry | undefined,
	instance: Virtualizer<any, TItemElement>,
) => {
	const getOldSize = () => {
		const index = element.getAttribute('data-index');
		if (typeof index === 'string' && !isNaN(Number(index))) {
			const key = instance?.options?.getItemKey(Number(index));
			const itemSizeCache = (instance as any).itemSizeCache as Map<typeof key, number>;
			const size = itemSizeCache.get(key);
			return size ?? undefined;
		}
		return undefined;
	};

	if (entry == null ? void 0 : entry.borderBoxSize) {
		const box = (entry as any).borderBoxSize[0];
		if (box) {
			const { inlineSize, blockSize } = box;
			// 判定为display:none子元素情况
			if (inlineSize === 0 && blockSize === 0) return getOldSize();
			const size = instance.options.horizontal ? inlineSize : blockSize;
			return Math.max(1, FixedTwo(size));
		}
	}

	const { width, height } = element.getBoundingClientRect();
	// 判定为display:none子元素情况
	if (width === 0 && height === 0) return getOldSize();
	const size = instance.options.horizontal ? width : height;
	return Math.max(1, FixedTwo(size));
};
