import { useVirtualizer } from '@tanstack/react-virtual';
import { horizontalMeasureElement } from './utils';
import { TableProps } from '../../type';
import { RefObject, useEffect } from 'react';

type Opt = {
    isEmpty: boolean;
    defaultWidth: number;
    bodyRef: RefObject<HTMLDivElement | null>;
};

type ItemSizeCache = Map<number, number>;

const useVirtual = <T extends Record<string, any>>(props: TableProps<T>, opt: Opt) => {
    const { dataSource, columns } = props;
    const { bodyRef, defaultWidth, isEmpty } = opt;

    // 竖向虚拟
    const verticalVirtualizer = useVirtualizer({
        // debug: true,
        overscan: 1,
        estimateSize: () => 38,
        count: dataSource?.length || 0,
        getScrollElement: () => bodyRef.current,
    });

    // 横向虚拟
    const horizontalVirtualizer = useVirtualizer({
        // debug: true,
        overscan: 100,
        horizontal: true,
        count: columns.length,
        getScrollElement: () => bodyRef.current,
        measureElement: horizontalMeasureElement,
        estimateSize: (index) => columns[index].width ?? defaultWidth,
    });

    const verticalVirtualItems = verticalVirtualizer.getVirtualItems();
    const horizontalVirtualItems = horizontalVirtualizer.getVirtualItems();

    // 非空时重置横向监测缓存
    // 原因：非空时可能产生纵向滚动条，empty情况监测不含滚动条
    useEffect(() => {
        if (!isEmpty) {
            horizontalVirtualizer.measure();
        }
    }, [isEmpty]);

    return {
        verticalVirtualItems, // 纵向虚拟显示item
        verticalTotalSize: verticalVirtualizer.getTotalSize(), // 纵向总高度
        verticalDistance: verticalVirtualItems[0]?.start ?? 0, // 纵向offset距离
        verticalMeasureElement: verticalVirtualizer.measureElement, // 纵向监测元素高度
        horizontalVirtualItems, // 横向虚拟显示item
        horizontalTotalSize: horizontalVirtualizer.getTotalSize(), // 横向总宽度
        horizontalDistance: horizontalVirtualItems[0]?.start ?? 0, // 横向offset距离
        horizontalMeasureElement: horizontalVirtualizer.measureElement, // 横向监测元素宽度
        horizontalItemSizeCache: (horizontalVirtualizer as any).itemSizeCache as ItemSizeCache, // 横向测量缓存
    };
};

export default useVirtual;
