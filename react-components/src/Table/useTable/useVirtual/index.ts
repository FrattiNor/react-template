import type { RefObject } from 'react';

import { useVirtualizer } from '@react/hooks';

import { observeElementRect, observeElementOffset, measureElement } from './utils';
import { defaultWidth } from '../index';

import type { TableColumns } from '../../type';
import type { BodyResizeObserver } from '../useBodyResizeObserver';
import type { BodyScrollObserver } from '../useBodyScrollObserver';
import type { DataSource } from '../useDataSource';
import type { HandledProps } from '../useHandleProps';

type Opt<T> = {
    handledProps: HandledProps<T>;
    dataSource: DataSource<T>;
    sortedColumns: TableColumns<T>;
    bodyResizeObserver: BodyResizeObserver;
    bodyScrollObserver: BodyScrollObserver;
    bodyRef: RefObject<HTMLDivElement | null>;
};

type ItemSizeCache = Map<number | string, number>;

const useVirtual = <T>(opt: Opt<T>) => {
    const { bodyRef, sortedColumns, dataSource, handledProps, bodyResizeObserver, bodyScrollObserver } = opt;

    const { showDataSource } = dataSource;

    const { rowHeight } = handledProps;

    // 竖向虚拟
    const verticalVirtualizer = useVirtualizer({
        overscan: 0,
        estimateSize: () => rowHeight,
        measureElement: measureElement,
        count: showDataSource?.length || 0,
        getScrollElement: () => bodyRef.current,
        observeElementRect: observeElementRect('vRect', bodyResizeObserver),
        observeElementOffset: observeElementOffset('vOffset', bodyScrollObserver, 'vertical'),
    });

    // 横向虚拟
    const horizontalVirtualizer = useVirtualizer({
        overscan: 0,
        horizontal: true,
        count: sortedColumns.length,
        measureElement: measureElement,
        getScrollElement: () => bodyRef.current,
        getItemKey: (index) => sortedColumns[index].key,
        estimateSize: (index) => Math.round(sortedColumns[index].width ?? defaultWidth),
        observeElementRect: observeElementRect('hRect', bodyResizeObserver),
        observeElementOffset: observeElementOffset('hOffset', bodyScrollObserver, 'horizontal'),
    });

    const verticalVirtualItems = verticalVirtualizer.getVirtualItems(); // 纵向虚拟显示item
    const verticalTotalSize = verticalVirtualizer.getTotalSize(); // 纵向总高度
    const verticalDistance = verticalVirtualItems[0]?.start ?? 0; // 纵向offset距离
    const verticalMeasureElement = verticalVirtualizer.measureElement; // 纵向监测元素高度

    const horizontalVirtualItems = horizontalVirtualizer.getVirtualItems(); // 横向虚拟显示item
    const horizontalDistance = horizontalVirtualItems[0]?.start ?? 0; // 横向offset距离
    const horizontalMeasureElement = horizontalVirtualizer.measureElement; // 横向监测元素宽度
    const horizontalRange = horizontalVirtualizer.range; // 横向显示的start和end
    const horizontalItemSizeCache = (horizontalVirtualizer as any).itemSizeCache as ItemSizeCache; // 横向测量缓存

    return {
        verticalDistance,
        verticalTotalSize,
        verticalVirtualItems,
        verticalMeasureElement,

        horizontalRange,
        horizontalDistance,
        horizontalVirtualItems,
        horizontalMeasureElement,
        horizontalItemSizeCache,
    };
};

export type VirtualCore = ReturnType<typeof useVirtual>;
export default useVirtual;
