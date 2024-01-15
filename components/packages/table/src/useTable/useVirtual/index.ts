import { observeElementRect, observeElementOffset, measureElement } from './utils';
import { BodyResizeObserver } from '../useBodyResizeObserver';
import { BodyScrollObserver } from '../useBodyScrollObserver';
import { useVirtualizer } from './useVirtualizer';
import { HandledProps } from '../useHandleProps';
import { TimeDebug } from '../useTimeDebug';
import { TableColumns } from '../../type';
import { defaultWidth } from '../index';
import { RefObject } from 'react';

type Opt<T> = {
    timeDebug: TimeDebug;
    showDataSource: T[];
    handledProps: HandledProps<T>;
    sortedColumns: TableColumns<T>;
    bodyResizeObserver: BodyResizeObserver;
    bodyScrollObserver: BodyScrollObserver;
    bodyRef: RefObject<HTMLDivElement | null>;
};

type ItemSizeCache = Map<number | string, number>;

const useVirtual = <T>(opt: Opt<T>) => {
    const { bodyRef, sortedColumns, showDataSource, handledProps, bodyResizeObserver, bodyScrollObserver, timeDebug } = opt;
    const { rowKey, rowHeight, calcRowHeight } = handledProps;

    timeDebug.start('useVirtual');

    // 竖向虚拟
    const verticalVirtualizer = useVirtualizer({
        overscan: 0,
        count: showDataSource?.length || 0,
        getScrollElement: () => bodyRef.current,
        estimateSize: () => calcRowHeight ?? rowHeight,
        observeElementRect: observeElementRect('vRect', bodyResizeObserver),
        observeElementOffset: observeElementOffset('vOffset', bodyScrollObserver),
        getItemKey: (index) => {
            const item = showDataSource?.[index];
            if (item) return ((typeof rowKey === 'function' ? rowKey(item) : item[rowKey]) as string) ?? index;
            return index;
        },
        scrollToFn: () => {
            // 屏蔽掉组件的scrollTo函数
            // 作用为resize时保持item位置不变
            return;
        },
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

    timeDebug.end('useVirtual');

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
