import { useState, type RefObject, useEffect } from 'react';

import { useVirtualizer } from '@react/hooks';

import type { TableBlockProps } from '../../type';
import type { DataSource } from '../useDataSource';

type Opt<T> = {
    props: TableBlockProps<T>;
    dataSource: DataSource<T>;
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useVirtual = <T>(opt: Opt<T>) => {
    const { bodyRef, dataSource, props } = opt;

    const [firstRowHeight, setFirstRowHeight] = useState<null | number>(null);

    const { colCount, paddingStart, paddingEnd } = props;

    const rowCount = Math.ceil((dataSource?.length || 0) / colCount);

    // 竖向虚拟
    const verticalVirtualizer = useVirtualizer({
        gap: 16,
        overscan: 0,
        paddingEnd,
        paddingStart,
        count: rowCount,
        getScrollElement: () => bodyRef.current,
        estimateSize: () => (typeof firstRowHeight === 'number' ? firstRowHeight : 100),
    });

    const verticalVirtualItems = verticalVirtualizer.getVirtualItems(); // 纵向虚拟显示item
    const verticalTotalSize = verticalVirtualizer.getTotalSize(); // 纵向总高度
    const verticalDistance = verticalVirtualItems[0]?.start ?? 0; // 纵向offset距离
    const verticalMeasureElement = verticalVirtualizer.measureElement; // 纵向监测元素高度

    // @ts-ignore
    const verticalFirstRowHeight = verticalVirtualizer.itemSizeCache.get(0);
    // 设置第一行高度为默认高度
    useEffect(() => {
        if (typeof firstRowHeight !== 'number' && typeof verticalFirstRowHeight === 'number') {
            setFirstRowHeight(verticalFirstRowHeight);
        }
    }, [verticalFirstRowHeight]);

    return {
        verticalDistance,
        verticalTotalSize,
        verticalVirtualItems,
        verticalMeasureElement,
    };
};

export type VirtualCore<T> = ReturnType<typeof useVirtual<T>>;
export default useVirtual;
