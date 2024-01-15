import { RefObject, useState } from 'react';
import { TimeDebug } from '../useTimeDebug';

type Opt = {
    timeDebug: TimeDebug;
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useCalcPing = (opt: Opt) => {
    const { bodyRef, timeDebug } = opt;
    const [pingLeft, setPingLeft] = useState<boolean>(false);
    const [pingRight, setPingRight] = useState<boolean>(false);

    const ping: Record<string, boolean> = {
        left: pingLeft,
        right: pingRight,
    };

    // 计算ping情况
    const calcPing = () => {
        // 等待滚动条产生或者消失
        window.requestAnimationFrame(() => {
            timeDebug.start('calcPing');

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

            timeDebug.end('calcPing');
        });
    };

    return { ping, calcPing };
};

export default useCalcPing;
