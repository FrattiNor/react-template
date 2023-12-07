import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';
import useResizeObserver from '@pkg/hooks/src/useResizeObserver';

type Ping = Record<string, boolean>;

type Opt = {
    dataSource?: any[];
    autoScrollTop?: boolean;
    headRef: RefObject<HTMLDivElement | null>;
    bodyRef: RefObject<HTMLDivElement | null>;
    setHeadPaddingRight: Dispatch<SetStateAction<number>>;
};

const useScroll = (opt: Opt) => {
    const { headRef, bodyRef, dataSource, autoScrollTop, setHeadPaddingRight } = opt;
    const [pingLeft, setPingLeft] = useState<boolean>(false);
    const [pingRight, setPingRight] = useState<boolean>(false);

    const ping: Ping = {
        left: pingLeft,
        right: pingRight,
    };

    const calcPaddingRight = () => {
        if (bodyRef.current && headRef.current) {
            const bodyClientWidth = bodyRef.current.clientWidth;
            const headClientWidth = headRef.current.clientWidth;
            setHeadPaddingRight(headClientWidth - bodyClientWidth);
        }
    };

    const judgePing = () => {
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

            judgePing();
            calcPaddingRight();
        }
    };

    useResizeObserver(bodyRef, {
        callback: () => {
            judgePing();
            calcPaddingRight();
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
