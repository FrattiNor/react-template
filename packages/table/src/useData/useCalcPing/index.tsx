import { RefObject, useState } from 'react';

type Opt = {
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useCalcPing = (opt: Opt) => {
    const { bodyRef } = opt;
    const [pingLeft, setPingLeft] = useState<number>(0);
    const [pingRight, setPingRight] = useState<number>(0);

    const ping: Record<string, number> = {
        left: pingLeft,
        right: pingRight,
    };

    // 计算ping情况
    const calcPing = () => {
        // 等待滚动条产生或者消失
        window.requestAnimationFrame(() => {
            if (bodyRef.current) {
                const { scrollWidth, clientWidth, scrollLeft } = bodyRef.current;

                if (scrollWidth === clientWidth) {
                    setPingLeft(0);
                    setPingRight(0);
                } else {
                    setPingLeft(scrollLeft);
                    setPingRight(scrollWidth - clientWidth - scrollLeft);
                }
            }
        });
    };

    return { ping, calcPing };
};

export default useCalcPing;
