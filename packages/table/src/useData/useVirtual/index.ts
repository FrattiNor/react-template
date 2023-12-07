import { useVirtualizer } from '@tanstack/react-virtual';
import { RefObject, useEffect, useState } from 'react';
import { MeasureElementNotMathRound } from './utils';
import { TableProps } from '../../type';

type Opt = {
    isEmpty: boolean;
    defaultWidth: number;
    bodyRef: RefObject<HTMLDivElement | null>;
};

type ItemSizeCache = Map<number, number>;

const useVirtual = <T extends Record<string, any>>(props: TableProps<T>, opt: Opt) => {
    const { dataSource, columns } = props;
    const [rowSize, setRowSize] = useState(40);
    const { bodyRef, isEmpty, defaultWidth } = opt;

    // 竖向虚拟
    const verticalVirtualizer = useVirtualizer({
        // debug: true,
        overscan: 1,
        estimateSize: () => rowSize,
        count: dataSource?.length || 0,
        getScrollElement: () => bodyRef.current,
    });

    // 横向虚拟
    const horizontalVirtualizer = useVirtualizer({
        // debug: true,
        overscan: 100,
        horizontal: true,
        count: columns.length,
        estimateSize: () => 1, // 默认设置为1，加载后能把columns全部监测一遍
        getScrollElement: () => bodyRef.current,
        measureElement: MeasureElementNotMathRound,
    });

    const verticalVirtualItems = verticalVirtualizer.getVirtualItems(); // 纵向虚拟显示item
    const verticalTotalSize = verticalVirtualizer.getTotalSize(); // 纵向总高度
    const verticalItemSizeCache = (verticalVirtualizer as any).itemSizeCache as ItemSizeCache; // 纵向测量缓存
    const verticalDistance = verticalVirtualItems[0]?.start ?? 0; // 纵向offset距离
    const verticalMeasureElement = verticalVirtualizer.measureElement; // 纵向监测元素高度
    const firstRowSizeCache = verticalItemSizeCache.get(0); // 纵向第一位监测高度

    const horizontalVirtualItems = horizontalVirtualizer.getVirtualItems(); // 横向虚拟显示item
    const horizontalItemSizeCache = (horizontalVirtualizer as any).itemSizeCache as ItemSizeCache; // 横向测量缓存
    const horizontalTotalSize = horizontalVirtualizer.getTotalSize(); // 横向总宽度
    const horizontalDistance = horizontalVirtualItems[0]?.start ?? 0; // 横向offset距离
    const horizontalMeasureElement = horizontalVirtualizer.measureElement; // 横向监测元素宽度

    // 非空时重置横向监测缓存
    // 原因：非空时可能产生纵向滚动条，empty情况监测不含滚动条
    useEffect(() => {
        if (!isEmpty) {
            const columnsTotalSize = columns.reduce((a, b) => a + (b.width ?? defaultWidth), 0);
            const bodyClientWidth = bodyRef.current?.clientWidth;
            // 能触发flex的情况再清除监测缓存
            if (bodyClientWidth && columnsTotalSize < bodyClientWidth) {
                horizontalVirtualizer.measure();
            }
        }
    }, [isEmpty]);

    // 设置第一行的高度为默认高度
    useEffect(() => {
        if (typeof firstRowSizeCache === 'number') {
            setRowSize(firstRowSizeCache);
        }
    }, [firstRowSizeCache]);

    return {
        setRowSize,
        verticalVirtualItems,
        verticalTotalSize,
        verticalDistance,
        verticalMeasureElement,
        horizontalVirtualItems,
        horizontalTotalSize,
        horizontalDistance,
        horizontalMeasureElement,
        horizontalItemSizeCache,
    };
};

export default useVirtual;
