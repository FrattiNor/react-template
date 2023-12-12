import { measureElement, observeElementRect, observeElementOffset } from './utils';
import { CalcPingAndScrollBarWidth } from '../useCalcPingAndScrollBarWidth';
import { BodyResizeObserver } from '../useBodyResizeObserver';
import { BodyScrollObserver } from '../useBodyScrollObserver';
import { useVirtualizer } from '@tanstack/react-virtual';
import { RefObject, useEffect, useState } from 'react';
import { SortedColumns } from '../useSortColumns';

type Opt<T extends Record<string, any>> = {
    rowKey: keyof T;
    dataSource?: T[];
    resized: boolean;
    defaultWidth: number;
    sortedColumns: SortedColumns<T>;
    bodyResizeObserver: BodyResizeObserver;
    bodyScrollObserver: BodyScrollObserver;
    bodyRef: RefObject<HTMLDivElement | null>;
    calcPingAndScrollBarWidth: CalcPingAndScrollBarWidth;
};

type ItemSizeCache = Map<number | string, number>;

const useVirtual = <T extends Record<string, any>>(opt: Opt<T>) => {
    const [rowSize, setRowSize] = useState(40);
    const { dataSource, sortedColumns, rowKey, bodyRef, defaultWidth, bodyResizeObserver, bodyScrollObserver, resized, calcPingAndScrollBarWidth } =
        opt;

    // 竖向虚拟
    const verticalVirtualizer = useVirtualizer({
        // debug: true,
        overscan: 1,
        estimateSize: () => rowSize,
        count: dataSource?.length || 0,
        getScrollElement: () => bodyRef.current,
        getItemKey: (index) => dataSource?.[index]?.[rowKey] ?? index,
        measureElement: measureElement,
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
        count: sortedColumns.columns.length,
        getScrollElement: () => bodyRef.current,
        getItemKey: (index) => sortedColumns.columns[index].key,
        estimateSize: (index) => sortedColumns.columns[index].width ?? defaultWidth,
        measureElement: measureElement,
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
    // const horizontalMeasure = horizontalVirtualizer.measure; // 清除横向缓存
    const horizontalRange = horizontalVirtualizer.range; // 横向显示的start和end
    const horizontalItemSizeCache = (horizontalVirtualizer as any).itemSizeCache as ItemSizeCache; // 横向测量缓存

    // 未resize过使用原生宽度作为宽度，避免横向滚动条闪烁问题
    const horizontalOriginSize = sortedColumns.columns.reduce((a, b) => a + (b.width ?? defaultWidth), 0);
    const horizontalVirtualSize = horizontalVirtualizer.getTotalSize();
    const horizontalTotalSize = resized ? horizontalVirtualSize : horizontalOriginSize;

    // 设置第一行的高度为默认高度
    const verticalItemSizeCache = (verticalVirtualizer as any).itemSizeCache as ItemSizeCache; // 纵向测量缓存
    const firstRowSizeCache = verticalItemSizeCache.get(dataSource?.[0]?.[rowKey] ?? 0); // 纵向第一位监测高度
    useEffect(() => {
        if (typeof firstRowSizeCache === 'number') {
            setRowSize(firstRowSizeCache);
        }
    }, [firstRowSizeCache]);

    //
    useEffect(() => {
        calcPingAndScrollBarWidth.calcPing();
    }, [horizontalTotalSize]);

    return {
        verticalDistance,
        verticalTotalSize,
        verticalVirtualItems,
        verticalMeasureElement,

        horizontalRange,
        // horizontalMeasure,
        horizontalDistance,
        horizontalTotalSize,
        horizontalVirtualItems,
        horizontalMeasureElement,
        horizontalItemSizeCache,
    };
};

export type VirtualCore = ReturnType<typeof useVirtual>;
export default useVirtual;
