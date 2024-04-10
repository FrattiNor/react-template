import type { RefObject } from 'react';
import { useLayoutEffect, useState } from 'react';

import type { BodyResizeObserver } from '../useBodyResizeObserver';
import type { BodyScrollObserver } from '../useBodyScrollObserver';

type Opt = {
    bodyRef: RefObject<HTMLDivElement | null>;
    bodyResizeObserver: BodyResizeObserver;
    bodyScrollObserver: BodyScrollObserver;
};

const useCalcPing = (opt: Opt) => {
    const { bodyRef, bodyResizeObserver, bodyScrollObserver } = opt;
    const [pingLeft, setPingLeft] = useState<boolean>(false);
    const [pingRight, setPingRight] = useState<boolean>(false);

    const ping: Record<string, boolean> = {
        left: pingLeft,
        right: pingRight,
    };

    useLayoutEffect(() => {
        // 计算ping情况
        const calcPing = () => {
            // 等待滚动条产生或者消失
            window.requestAnimationFrame(() => {
                if (bodyRef.current) {
                    const { scrollWidth, clientWidth, scrollLeft } = bodyRef.current;

                    if (scrollWidth === clientWidth) {
                        setPingLeft(false);
                        setPingRight(false);
                    } else {
                        setPingLeft(scrollLeft > 0);
                        setPingRight(scrollWidth - clientWidth - scrollLeft > 0);
                    }
                }
            });
        };

        bodyResizeObserver.addListener('calcPing', calcPing);

        bodyScrollObserver.addListener('calcPing', calcPing, 'horizontal');

        return () => {
            bodyResizeObserver.removeListener('calcPing');

            bodyScrollObserver.removeListener('calcPing', 'horizontal');
        };
    }, []);

    return ping;
};

export default useCalcPing;
