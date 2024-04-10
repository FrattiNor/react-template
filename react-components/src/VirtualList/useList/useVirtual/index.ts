import { useRef } from 'react';

import { useVirtualizer } from '@react/hooks';

import type { AnyObj } from '../../type';

const useVirtual = <T extends AnyObj>(showData?: T[]) => {
    const lineHeight = 26;
    const virtualWrapperRef = useRef<HTMLDivElement>(null);

    // 竖向虚拟
    const virtualizer = useVirtualizer({
        overscan: 0,
        paddingEnd: 4,
        paddingStart: 4,
        estimateSize: () => lineHeight,
        count: showData?.length || 0,
        getScrollElement: () => virtualWrapperRef.current,
    });

    const virtualItems = virtualizer.getVirtualItems(); // 纵向虚拟显示item
    const totalSize = virtualizer.getTotalSize(); // 纵向总高度
    const distance = virtualItems[0]?.start ?? 0; // 纵向offset距离
    const measureElement = virtualizer.measureElement; // 纵向监测元素高度

    return {
        virtualizer,
        lineHeight,
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
