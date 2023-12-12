import { useState } from 'react';

const useCalcPingAndScrollBarWidth = () => {
    const [pingLeft, setPingLeft] = useState<boolean>(false);
    const [pingRight, setPingRight] = useState<boolean>(false);
    const [vScrollBarWidth, setVScrollBarWidth] = useState(0);

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

    // 计算纵向滚动条宽度
    const calcScrollBarWidth = (target: HTMLDivElement) => {
        const { clientWidth, offsetWidth } = target;
        setVScrollBarWidth(offsetWidth - clientWidth);
    };

    return { ping, vScrollBarWidth, calcPing, calcScrollBarWidth };
};

export type CalcPingAndScrollBarWidth = ReturnType<typeof useCalcPingAndScrollBarWidth>;
export default useCalcPingAndScrollBarWidth;
