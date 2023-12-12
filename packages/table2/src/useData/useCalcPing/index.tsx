import { useState } from 'react';

const useCalcPing = () => {
    const [pingLeft, setPingLeft] = useState<boolean>(false);
    const [pingRight, setPingRight] = useState<boolean>(false);

    const ping: Record<string, boolean> = {
        left: pingLeft,
        right: pingRight,
    };

    // 计算ping情况
    const calcPing = (target: HTMLDivElement) => {
        // 等待滚动条产生或者消失
        window.requestAnimationFrame(() => {
            const { scrollWidth, clientWidth, scrollLeft } = target;

            if (scrollWidth === clientWidth) {
                setPingLeft(false);
                setPingRight(false);
            } else {
                setPingLeft(scrollLeft > 0);
                setPingRight(scrollLeft < scrollWidth - clientWidth);
            }
        });
    };

    return { ping, calcPing };
};

export type CalcPing = ReturnType<typeof useCalcPing>;
export default useCalcPing;
