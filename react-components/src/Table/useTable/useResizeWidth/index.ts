import { useResize } from '@react/hooks';

import { defaultWidth } from '../index';
import { type VirtualCore, type HandledProps, type HandledColumnsObj } from '../type';
import { tableExpandableKey } from '../useExpandable';
import { tableRowSelectionKey } from '../useRowSelection';

type Opt<T> = {
	virtual: VirtualCore<T>;
	handledProps: HandledProps<T>;
	handledColumnsObj: HandledColumnsObj<T>;
};

const useResizeWidth = <T>(opt: Opt<T>) => {
	const { handledColumnsObj, virtual, handledProps } = opt;
	const { handledColumns } = handledColumnsObj;
	const { horizontalItemSizeCache } = virtual;
	const { onResizeEnd } = handledProps;

	const { onMouseDown, markData, activeData, resized } = useResize({
		beforeResize({ event }) {
			const parent = (event.currentTarget as HTMLDivElement)?.parentElement as HTMLDivElement;
			const cellKey = parent?.dataset.key;
			return {
				key: cellKey ?? undefined,
				clientWidth: cellKey ? parent.clientWidth : undefined,
			};
		},
		onResizing({ active, markData }) {
			const { moveX } = active;
			const { key, clientWidth } = markData;
			return {
				key,
				width: clientWidth ? Math.min(Math.max(clientWidth + moveX, 50), 2000) : undefined,
			};
		},
		afterResize() {
			if (typeof onResizeEnd === 'function') {
				const widths: Record<string, number> = {};
				handledColumns.forEach(({ key, width }) => {
					if (key !== tableRowSelectionKey && key !== tableExpandableKey) {
						widths[key] = horizontalItemSizeCache.get(key) ?? width ?? defaultWidth;
					}
				});
				onResizeEnd(widths);
			}
		},
	});

	const resizeReadyKey = markData?.key;
	const resizeActiveKey = activeData?.key;
	const resizeActiveWidth = activeData?.width;

	return { resizeReadyKey, resizeActiveKey, resizeActiveWidth, resized, onResizeStart: onMouseDown };
};

export default useResizeWidth;
