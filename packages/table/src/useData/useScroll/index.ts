import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import useResizeObserver from '@pkg/hooks/src/useResizeObserver';

type Ping = Record<string, boolean>;

type Opt = {
    headRef: RefObject<HTMLDivElement | null>;
    bodyRef: RefObject<HTMLDivElement | null>;
    setHeadPaddingRight: Dispatch<SetStateAction<number>>;
};

const useScroll = (opt: Opt) => {
    const { headRef, bodyRef, setHeadPaddingRight } = opt;
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

    return { onBodyScroll, ping };
};

export default useScroll;
