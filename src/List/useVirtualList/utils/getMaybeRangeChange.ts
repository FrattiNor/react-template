import { flushSync } from 'react-dom';

import binarySearch from './binarySearch';

import type useVirtualProps from '../hooks/useVirtualProps';
import type useVirtualState from '../hooks/useVirtualState';

type Props<T> = {
	state: ReturnType<typeof useVirtualState<T>>;
	getProps: ReturnType<typeof useVirtualProps<T>>;
};

const getMaybeRangeChange = <T>({ state, getProps }: Props<T>) => {
	const {
		rerender,
		getScrollOffset,
		getContainerSize,
		setRange,
		getRange,
		getItemSizeList,
		setTotalSize,
		getTotalSize,
		setPaddingStart,
		getPaddingStart,
	} = state;

	return ({ sync }: { sync: boolean; from: string }) => {
		const range = getRange();
		const totalSize = getTotalSize();
		const paddingStart = getPaddingStart();
		const itemSizeList = getItemSizeList();
		const scrollOffset = getScrollOffset();
		const containerSize = getContainerSize();

		if (containerSize === null || itemSizeList === null || itemSizeList.length === 0) {
			if (range !== null) {
				setRange(null);
				setTotalSize(0);
				setPaddingStart(0);
				rerender();
			}
		} else {
			const _startIndex = binarySearch({
				startIndex: 0,
				endIndex: getProps('data').length - 1,
				getSize: (i) => itemSizeList[i].start,
				target: scrollOffset,
			})[0];
			const _endIndex = binarySearch({
				startIndex: _startIndex,
				endIndex: getProps('data').length - 1,
				getSize: (i) => itemSizeList[i].end,
				target: scrollOffset + containerSize,
			})[1];
			const startIndex = Math.max(0, _startIndex - getProps('overscan')[0]);
			const endIndex = Math.min(getProps('data').length - 1, _endIndex + getProps('overscan')[1]);
			const nextPaddingStart = itemSizeList[startIndex].start;
			const nextTotalSize = itemSizeList[itemSizeList.length - 1].end;

			if (range?.[0] !== startIndex || range?.[1] !== endIndex || totalSize !== nextTotalSize || paddingStart !== nextPaddingStart) {
				setTotalSize(nextTotalSize);
				setPaddingStart(nextPaddingStart);
				setRange([startIndex, endIndex]);
				if (sync === true) {
					flushSync(rerender);
				} else {
					rerender();
				}
			}
		}
	};
};

export default getMaybeRangeChange;
