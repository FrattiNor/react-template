import type { RefObject } from 'react';
import { useLayoutEffect, useState } from 'react';

import type { BodyResizeObserver } from '../useBodyResizeObserver';

type Opt = {
    bodyRef: RefObject<HTMLDivElement | null>;
    bodyResizeObserver: BodyResizeObserver;
};

const useCalcScrollBarWidth = (opt: Opt) => {
    const { bodyRef, bodyResizeObserver } = opt;
    const [vScrollBarWidth, setVScrollBarWidth] = useState(0);

    useLayoutEffect(() => {
        // 计算纵向滚动条宽度
        const calcScrollBarWidth = () => {
            if (bodyRef.current) {
                const { clientWidth, offsetWidth } = bodyRef.current;
                setVScrollBarWidth(offsetWidth - clientWidth);
            }
        };

        bodyResizeObserver.addListener('calcScrollBarWidth', calcScrollBarWidth);

        return () => {
            bodyResizeObserver.removeListener('calcScrollBarWidth');
        };
    }, []);

    return vScrollBarWidth;
};

export default useCalcScrollBarWidth;
