import { RefObject, useState } from 'react';
import { TimeDebug } from '../useTimeDebug';

type Opt = {
    timeDebug: TimeDebug;
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useCalcScrollBarWidth = (opt: Opt) => {
    const { bodyRef, timeDebug } = opt;
    const [vScrollBarWidth, setVScrollBarWidth] = useState(0);

    // 计算纵向滚动条宽度
    const calcScrollBarWidth = () => {
        timeDebug.start('calcScrollBarWidth');
        if (bodyRef.current) {
            const { clientWidth, offsetWidth } = bodyRef.current;
            setVScrollBarWidth(offsetWidth - clientWidth);
        }
        timeDebug.end('calcScrollBarWidth');
    };

    return { vScrollBarWidth, calcScrollBarWidth };
};

export default useCalcScrollBarWidth;
