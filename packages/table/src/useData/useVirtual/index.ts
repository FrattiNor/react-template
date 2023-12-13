import { observeElementRect, observeElementOffset } from './utils';
import { BodyResizeObserver } from '../useBodyResizeObserver';
import { BodyScrollObserver } from '../useBodyScrollObserver';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Column } from '../../type';
import { RefObject } from 'react';

type Opt<T extends Record<string, any>> = {
    rowKey: keyof T;
    dataSource?: T[];
    rowHeight: number;
    defaultWidth: number;
    totalColumns: Column<T>[];
    bodyResizeObserver: BodyResizeObserver;
    bodyScrollObserver: BodyScrollObserver;
    bodyRef: RefObject<HTMLDivElement | null>;
};

type ItemSizeCache = Map<number | string, number>;

const useVirtual = <T extends Record<string, any>>(opt: Opt<T>) => {
    const { dataSource, totalColumns, rowKey, bodyRef, defaultWidth, rowHeight } = opt;
    const { bodyResizeObserver, bodyScrollObserver } = opt;

    // 竖向虚拟
    const verticalVirtualizer = useVirtualizer({
        // debug: true,
        overscan: 1,
        estimateSize: () => rowHeight,
        count: dataSource?.length || 0,
        getScrollElement: () => bodyRef.current,
        getItemKey: (index) => dataSource?.[index]?.[rowKey] ?? index,
        observeElementRect: observeElementRect('vRect', bodyResizeObserver),
        observeElementOffset: observeElementOffset('vOffset', bodyScrollObserver),
        scrollToFn: () => {
            // 屏蔽掉组件的scrollTo函数
            // 作用为resize时保持item位置不变
            return;
        },
    });

    // 横向虚拟
    const horizontalVirtualizer = useVirtualizer({
        // debug: true,
        overscan: 0,
        horizontal: true,
        count: totalColumns.length,
        getScrollElement: () => bodyRef.current,
        getItemKey: (index) => totalColumns[index].key,
        estimateSize: (index) => Math.round(totalColumns[index].width ?? defaultWidth),
        observeElementRect: observeElementRect('hRect', bodyResizeObserver),
        observeElementOffset: observeElementOffset('hOffset', bodyScrollObserver),
        scrollToFn: () => {
            // 屏蔽掉组件的scrollTo函数
            // 作用为resize时保持item位置不变
            return;
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
        // horizontalMeasure,
        horizontalDistance,
        // horizontalTotalSize,
        horizontalVirtualItems,
        horizontalMeasureElement,
        horizontalItemSizeCache,
    };
};

export type VirtualCore = ReturnType<typeof useVirtual>;
export default useVirtual;
