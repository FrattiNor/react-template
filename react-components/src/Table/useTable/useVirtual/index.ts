import { type RefObject } from 'react';

import { useVirtualizer } from '@react/hooks';

import { type HandledColumn } from '../../type';
import { type BodyObserver, type HandledColumnsObj, type HandledProps, type DataSource } from '../type';

type Opt<T> = {
	dataSource: DataSource<T>;
	bodyObserver: BodyObserver;
	handledProps: HandledProps<T>;
	handledColumnsObj: HandledColumnsObj<T>;
	bodyRef: RefObject<HTMLDivElement | null>;
};

type ItemSizeCache = Map<number | string, number>;

const useVirtual = <T>(opt: Opt<T>) => {
	const { bodyRef, handledColumnsObj, dataSource, handledProps } = opt;

	const { handledColumns } = handledColumnsObj;

	const { showDataSource } = dataSource;

	const { rowHeight, rowKey } = handledProps;

	const getRowKey = (item: T, index: number) => {
		const key = typeof rowKey === 'function' ? rowKey(item) : item[rowKey];
		if (typeof key === 'string' || typeof key === 'number') {
			return key;
		}
		return index;
	};

	// 竖向虚拟
	const verticalVirtualizer = useVirtualizer({
		overscan: 0,
		estimateSize: () => rowHeight,
		count: showDataSource?.length || 0,
		getScrollElement: () => bodyRef.current,
		getItemKey: (index) => getRowKey(showDataSource?.[index], index),
	});

	// 横向虚拟
	const horizontalVirtualizer = useVirtualizer({
		overscan: 0,
		horizontal: true,
		count: handledColumns.length,
		getScrollElement: () => bodyRef.current,
		getItemKey: (index) => handledColumns[index].key,
		estimateSize: (index) => Math.round(handledColumns[index].width),
	});

	const verticalVirtualItems = verticalVirtualizer.getVirtualItems(); // 纵向虚拟显示item
	const verticalTotalSize = verticalVirtualizer.getTotalSize(); // 纵向总高度
	const verticalDistance = verticalVirtualItems[0]?.start ?? 0; // 纵向offset距离
	const verticalMeasureElement = verticalVirtualizer.measureElement; // 纵向监测元素高度

	const horizontalVirtualItems = horizontalVirtualizer.getVirtualItems(); // 横向虚拟显示item
	const horizontalMeasureElement = horizontalVirtualizer.measureElement; // 横向监测元素宽度
	const horizontalItemSizeCache = (horizontalVirtualizer as any).itemSizeCache as ItemSizeCache; // 横向size缓存

	// 横向虚拟显示index对象
	const horizontalVirtualItemsIndexObj = (() => {
		const indexObj: Record<string, true> = {};
		horizontalVirtualItems.forEach(({ index }) => {
			indexObj[index] = true;
		});
		return indexObj;
	})();

	// 获取是否需要render
	const getNeedRenderByColumn = (column: HandledColumn<T>) => {
		const virtualRender = horizontalVirtualItemsIndexObj[column.colIndex] === true;
		if (virtualRender === true) return true;
		const forceRender = column.forceRender === true;
		if (forceRender === true) return true;
		const editRender = !!column.edit;
		if (editRender === true) return true;
		const fixedRender = column.fixed === 'left' || column.fixed === 'right';
		if (fixedRender === true) return true;
		return false;
	};

	return {
		verticalDistance,
		verticalTotalSize,
		verticalVirtualItems,
		verticalMeasureElement,

		horizontalMeasureElement,
		horizontalItemSizeCache,
		getNeedRenderByColumn,
	};
};

export default useVirtual;
