import { RefObject } from 'react';

import { useVirtualizer } from './useVirtualizer';
import { observeElementRect, observeElementOffset, measureElement } from './utils';
import { TableColumns } from '../../type';
import { defaultWidth } from '../index';
import { BodyResizeObserver } from '../useBodyResizeObserver';
import { BodyScrollObserver } from '../useBodyScrollObserver';
import { HandledProps } from '../useHandleProps';

type Opt<T> = {
    showDataSource: T[];
    handledProps: HandledProps<T>;
    sortedColumns: TableColumns<T>;
    bodyResizeObserver: BodyResizeObserver;
    bodyScrollObserver: BodyScrollObserver;
    bodyRef: RefObject<HTMLDivElement | null>;
};

type ItemSizeCache = Map<number | string, number>;

const useVirtual = <T>(opt: Opt<T>) => {
    const { bodyRef, sortedColumns, showDataSource, handledProps, bodyResizeObserver, bodyScrollObserver } = opt;
    const { rowHeight, calcRowHeight } = handledProps;

    // 竖向虚拟
    const verticalVirtualizer = useVirtualizer({
        options: {
            overscan: 0,
            measureElement: measureElement,
            count: showDataSource?.length || 0,
            getScrollElement: () => bodyRef.current,
            estimateSize: () => calcRowHeight ?? rowHeight,
            observeElementRect: observeElementRect('vRect', bodyResizeObserver),
            observeElementOffset: observeElementOffset('vOffset', bodyScrollObserver),
            getItemKey: (index) => index,
            scrollToFn: () => {
                // 屏蔽掉组件的scrollTo函数
                // 作用为resize时保持item位置不变
                return;
            },
        },
    });

    // 横向虚拟
    const horizontalVirtualizer = useVirtualizer({
        maxCounter: 1,
        options: {
            overscan: 1,
            horizontal: true,
            count: sortedColumns.length,
            measureElement: measureElement,
            getScrollElement: () => bodyRef.current,
            getItemKey: (index) => sortedColumns[index].key,
            estimateSize: (index) => Math.round(sortedColumns[index].width ?? defaultWidth),
            observeElementRect: observeElementRect('hRect', bodyResizeObserver),
            observeElementOffset: observeElementOffset('hOffset', bodyScrollObserver),
            scrollToFn: () => {
                // 屏蔽掉组件的scrollTo函数
                // 作用为resize时保持item位置不变
                return;
            },
        },
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
