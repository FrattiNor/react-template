import { measureElement, observeElementRect, observeElementOffset } from './utils';
import { useVirtualizer, elementScroll } from '@tanstack/react-virtual';
import useBodyResizeObserver from '../useBodyResizeObserver';
import useBodyScrollObserver from '../useBodyScrollObserver';
import { RefObject, useEffect, useState } from 'react';
import { TableProps } from '../../type';

type Opt = {
    defaultWidth: number;
    bodyRef: RefObject<HTMLDivElement | null>;
    bodyResizeObserver: ReturnType<typeof useBodyResizeObserver>;
    bodyScrollObserver: ReturnType<typeof useBodyScrollObserver>;
};

type ItemSizeCache = Map<number | string, number>;

const useVirtual = <T extends Record<string, any>>(props: TableProps<T>, opt: Opt) => {
    const { dataSource, columns, rowKey } = props;
    const [rowSize, setRowSize] = useState(40);
    const { bodyRef, defaultWidth, bodyResizeObserver, bodyScrollObserver } = opt;

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
        count: columns.length,
        estimateSize: () => defaultWidth,
        getScrollElement: () => bodyRef.current,
        getItemKey: (index) => columns[index].key,
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
    const verticalItemSizeCache = (verticalVirtualizer as any).itemSizeCache as ItemSizeCache; // 纵向测量缓存
    const verticalDistance = verticalVirtualItems[0]?.start ?? 0; // 纵向offset距离
    const verticalMeasureElement = verticalVirtualizer.measureElement; // 纵向监测元素高度
    const firstRowSizeCache = verticalItemSizeCache.get(dataSource?.[0]?.[rowKey] ?? 0); // 纵向第一位监测高度

    const horizontalVirtualItems = horizontalVirtualizer.getVirtualItems(); // 横向虚拟显示item
    const horizontalItemSizeCache = (horizontalVirtualizer as any).itemSizeCache as ItemSizeCache; // 横向测量缓存
    const horizontalTotalSize = horizontalVirtualizer.getTotalSize(); // 横向总宽度
    const horizontalDistance = horizontalVirtualItems[0]?.start ?? 0; // 横向offset距离
    const horizontalMeasureElement = horizontalVirtualizer.measureElement; // 横向监测元素宽度
    const horizontalMeasure = horizontalVirtualizer.measure; // 清除横向缓存
    const horizontalRange = horizontalVirtualizer.range; // 横向显示的start和end

    // 设置第一行的高度为默认高度
    useEffect(() => {
        if (typeof firstRowSizeCache === 'number') {
            setRowSize(firstRowSizeCache);
        }
    }, [firstRowSizeCache]);

    return {
        verticalDistance,
        verticalTotalSize,
        verticalVirtualItems,
        verticalMeasureElement,

        horizontalRange,
        horizontalMeasure,
        horizontalDistance,
        horizontalTotalSize,
        horizontalVirtualItems,
        horizontalMeasureElement,
        horizontalItemSizeCache,
    };
};

export default useVirtual;
