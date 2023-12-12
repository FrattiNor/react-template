import { RefObject, useState } from 'react';

type Opt = {
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useCalcPingAndScrollBarWidth = (opt: Opt) => {
    const { bodyRef } = opt;
    const [pingLeft, setPingLeft] = useState<boolean>(false);
    const [pingRight, setPingRight] = useState<boolean>(false);
    const [vScrollBarWidth, setVScrollBarWidth] = useState(0);

    const ping: Record<string, boolean> = {
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
                    setPingLeft(false);
                    setPingRight(false);
                } else {
                    setPingLeft(scrollLeft > 0);
                    setPingRight(scrollLeft < scrollWidth - clientWidth);
                }
            }
        });
    };

    // 计算纵向滚动条宽度
    const calcScrollBarWidth = () => {
        if (bodyRef.current) {
            const { clientWidth, offsetWidth } = bodyRef.current;
            setVScrollBarWidth(offsetWidth - clientWidth);
        }
    };

    return { ping, vScrollBarWidth, calcPing, calcScrollBarWidth };
};

export type CalcPingAndScrollBarWidth = ReturnType<typeof useCalcPingAndScrollBarWidth>;
export default useCalcPingAndScrollBarWidth;
