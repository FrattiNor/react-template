import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import { RefObject, useState } from 'react';

type Opt = {
    bodyRef: RefObject<HTMLDivElement | null>;
    headRef: RefObject<HTMLDivElement | null>;
};

const useBodyObserver = (opt: Opt) => {
    const { bodyRef, headRef } = opt;
    const [vScrollBarWidth, setVScrollBarWidth] = useState(0);
    const [pingLeft, setPingLeft] = useState<boolean>(false);
    const [pingRight, setPingRight] = useState<boolean>(false);

    const ping: Record<string, boolean> = {
        left: pingLeft,
        right: pingRight,
    };

    // 计算纵向滚动条宽度
    const calcScrollBarWidth = (target: HTMLDivElement) => {
        const { clientWidth, offsetWidth } = target;
        setVScrollBarWidth(offsetWidth - clientWidth);
    };

    // 计算ping情况
    const calcPing = (target: HTMLDivElement) => {
        const { scrollWidth, clientWidth, scrollLeft } = target;

        if (scrollWidth === clientWidth) {
            setPingLeft(false);
            setPingRight(false);
        } else {
            setPingLeft(scrollLeft > 0);
            setPingRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    // observer body resize
    const bodyResizeObserver = useBodyResizeObserver({ bodyRef, calcPing, calcScrollBarWidth });
    // observer body scroll
    const bodyScrollObserver = useBodyScrollObserver({ bodyRef, headRef, calcPing, calcScrollBarWidth });

    return { vScrollBarWidth, ping, bodyResizeObserver, bodyScrollObserver };
};

export default useBodyObserver;
