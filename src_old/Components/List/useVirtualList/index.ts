/* eslint-disable react-compiler/react-compiler */
import { useEffect } from 'react';

import useContainerObserver from './hooks/useContainerObserver';
import useItemObserver from './hooks/useItemObserver';
import useVirtualProps from './hooks/useVirtualProps';
import useVirtualState from './hooks/useVirtualState';
import getItemSizeListChange from './utils/getItemSizeListChange';
import getMaybeChangeItemSize from './utils/getMaybeChangeItemSize';
import getMaybeRangeChange from './utils/getMaybeRangeChange';
import getMeasureElement from './utils/getMeasureElement';
import getVirtualItems from './utils/getVirtualItems';

export type VirtualListProps<T> = {
	data: T[];
	overscan?: [number, number];
	getItemKey: (item: T) => string; // 不接受动态变更
	getItemSize: (key: string) => number; // 不接受动态变更
	containerRef: React.RefObject<HTMLDivElement | null>;
	gap?: number;
	direction: 'h' | 'v';
};

const useVirtualList = <T>(props: VirtualListProps<T>) => {
	'use no memo';
	const getProps = useVirtualProps<T>(props);

	const state = useVirtualState<T>();

	const { getItemSizeMap, getTotalSize, getPaddingStart } = state;

	const maybeRangeChange = getMaybeRangeChange({ state, getProps });

	const itemSizeListChange = getItemSizeListChange({ state, getProps, maybeRangeChange });

	const maybeChangeItemSize = getMaybeChangeItemSize({ state, getProps, itemSizeListChange });

	const itemObserver = useItemObserver({ getProps, maybeChangeItemSize });

	const measureElement = getMeasureElement({ state, getProps, maybeChangeItemSize, itemObserver });

	const virtualItems = getVirtualItems({ state });

	useContainerObserver({ state, getProps, maybeRangeChange, containerRef: props.containerRef });

	useEffect(() => {
		getItemSizeMap().clear();
		itemSizeListChange();
	}, [props.data]);

	useEffect(() => {
		itemSizeListChange();
	}, [props.gap]);

	useEffect(() => {
		maybeRangeChange({ sync: false, from: 'overscan' });
	}, [props.overscan?.[0], props.overscan?.[1]]);

	return { virtualItems, paddingStart: getPaddingStart(), totalSize: getTotalSize(), measureElement };
};

export default useVirtualList;
