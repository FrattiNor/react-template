import MouseWheel from '@better-scroll/mouse-wheel';
import PullDown from '@better-scroll/pull-down';
import { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';
import ScrollBar from './scrollbar';

BScroll.use(MouseWheel);
BScroll.use(ScrollBar);
BScroll.use(PullDown);

export type PullDownType = '' | 'enter' | 'leave' | 'fetching' | 'success';

type Props = {
    scrollRef: React.RefObject<HTMLDivElement>;
    enableScroll?: boolean;
};

function useScroll({ scrollRef, enableScroll }: Props) {
    const [scroll, setScroll] = useState<BScroll | null>(null);

    useEffect(() => {
        if (enableScroll) {
            if (scrollRef.current) {
                const pullDownHeight = 65;

                const newScroll = new BScroll(scrollRef.current, {
                    click: true,
                    scrollX: false,
                    scrollbar: {
                        minSize: 15,
                    },
                    bounce: {
                        top: true,
                        left: false,
                        right: false,
                        bottom: false,
                    },
                    pullDownRefresh: {
                        threshold: pullDownHeight * 1.1,
                        stop: pullDownHeight,
                    },
                    mouseWheel: {
                        speed: 20,
                        invert: false,
                        easeTime: 300,
                    },
                    probeType: 3,
                });

                setScroll(newScroll);

                return () => {
                    newScroll.destroy();
                    setScroll(null);
                };
            }
        }
    }, [enableScroll]);

    return { scroll };
}

export default useScroll;
