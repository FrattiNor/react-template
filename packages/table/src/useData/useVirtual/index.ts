import { useVirtualizer } from '@tanstack/react-virtual';
import { TableProps } from '../../type';
import { RefObject } from 'react';

type Opt = {
    defaultWidth: number;
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useVirtual = <T extends Record<string, any>>(props: TableProps<T>, opt: Opt) => {
    const { dataSource, columns } = props;
    const { bodyRef, defaultWidth } = opt;

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
        estimateSize: (index) => columns[index].width ?? defaultWidth,
    });

    const verticalVirtualItems = verticalVirtualizer.getVirtualItems();
    const horizontalVirtualItems = horizontalVirtualizer.getVirtualItems();

    return {
        verticalVirtualItems,
        verticalTotalSize: verticalVirtualizer.getTotalSize(),
        verticalDistance: verticalVirtualItems[0]?.start ?? 0,
        verticalMeasureElement: verticalVirtualizer.measureElement,
        horizontalVirtualItems,
        horizontalTotalSize: horizontalVirtualizer.getTotalSize(),
        horizontalDistance: horizontalVirtualItems[0]?.start ?? 0,
        horizontalMeasureElement: horizontalVirtualizer.measureElement,
    };
};

export default useVirtual;
