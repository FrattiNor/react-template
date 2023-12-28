import { RefObject, useState } from 'react';

type Opt = {
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useCalcScrollBarWidth = (opt: Opt) => {
    const { bodyRef } = opt;
    const [vScrollBarWidth, setVScrollBarWidth] = useState(0);

    // 计算纵向滚动条宽度
    const calcScrollBarWidth = () => {
        if (bodyRef.current) {
            const { clientWidth, offsetWidth } = bodyRef.current;
            setVScrollBarWidth(offsetWidth - clientWidth);
        }
    };

    return { vScrollBarWidth, calcScrollBarWidth };
};

export default useCalcScrollBarWidth;
