import { useRef } from 'react';

import { useVirtualizer } from '@react/hooks';

import type { AnyObj, HandledDataItem } from '../../type';

const useVirtual = <T extends AnyObj>(showData: HandledDataItem<T>[]) => {
    const lineHeight = 26;
    const virtualWrapperRef = useRef<HTMLDivElement>(null);

    // 竖向虚拟
    const virtualizer = useVirtualizer({
        overscan: 0,
        paddingEnd: 4,
        paddingStart: 4,
        count: showData?.length || 0,
        estimateSize: () => lineHeight,
        getScrollElement: () => virtualWrapperRef.current,
    });

    const virtualItems = virtualizer.getVirtualItems(); // 纵向虚拟显示item
    const totalSize = virtualizer.getTotalSize(); // 纵向总高度
    const distance = virtualItems[0]?.start ?? 0; // 纵向offset距离
    const measureElement = virtualizer.measureElement; // 纵向监测元素高度

    return {
        lineHeight,
        virtualizer,
        virtualWrapperRef,
        virtual: {
            distance,
            totalSize,
            virtualItems,
            measureElement,
        },
    };
};

export default useVirtual;
