import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import useResizeObserver from '@pkg/hooks/src/useResizeObserver';

type Ping = Record<string, boolean>;

type Opt = {
    dataSource?: any[];
    autoScrollTop?: boolean;
    horizontalMeasure: () => void;
    headRef: RefObject<HTMLDivElement | null>;
    bodyRef: RefObject<HTMLDivElement | null>;
    setVerticalScrollBarWidth: Dispatch<SetStateAction<number>>;
};

const useScroll = (opt: Opt) => {
    const beforeBodyWidth = useRef(0);
    const { headRef, bodyRef, dataSource, autoScrollTop, setVerticalScrollBarWidth, horizontalMeasure } = opt;
    const [pingLeft, setPingLeft] = useState<boolean>(false);
    const [pingRight, setPingRight] = useState<boolean>(false);

    const ping: Ping = {
        left: pingLeft,
        right: pingRight,
    };

    const calcScrollBarWidth = () => {
        if (bodyRef.current && headRef.current) {
            const bodyClientWidth = bodyRef.current.clientWidth;
            const headClientWidth = headRef.current.clientWidth;
            const nextVerticalScrollBarWidth = headClientWidth - bodyClientWidth;
            setVerticalScrollBarWidth(nextVerticalScrollBarWidth);
        }
    };

    const calcPing = () => {
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
    };

    const onBodyScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
        if (headRef.current) {
            const target = e.target as HTMLDivElement;
            headRef.current.scrollTo({ left: target.scrollLeft });

            calcPing();
            calcScrollBarWidth();
        }
    };

    useResizeObserver(bodyRef, {
        callback: (size) => {
            if (size.width < beforeBodyWidth.current) horizontalMeasure();
            beforeBodyWidth.current = size.width;
            calcPing();
            calcScrollBarWidth();
        },
    });

    // 数据变更时触发滚动回顶部
    useEffect(() => {
        if (autoScrollTop === undefined || autoScrollTop === true) {
            bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [dataSource]);

    return { onBodyScroll, ping };
};

export default useScroll;
