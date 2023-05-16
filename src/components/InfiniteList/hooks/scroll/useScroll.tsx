import MouseWheel from '@better-scroll/mouse-wheel';
import PullDown from '@better-scroll/pull-down';
import { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';
import ScrollBar from './scrollbar';
import FetchTip from './fetchTip';

BScroll.use(MouseWheel);
BScroll.use(ScrollBar);
BScroll.use(PullDown);

export type PullDownType = '' | 'enter' | 'leave' | 'fetching' | 'success';

type Props = {
    scrollRef: React.RefObject<HTMLDivElement>;
    tipRef: React.RefObject<HTMLDivElement>;
    refetch: () => Promise<any>;
};

function useScroll({ scrollRef, tipRef, refetch }: Props) {
    const [pullDownType, setPullDownType] = useState<PullDownType>('');
    const [scroll, setScroll] = useState<BScroll | null>(null);

    useEffect(() => {
        if (scrollRef.current) {
            const pullDownHeight = tipRef.current?.clientHeight || 65;

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
            };
        }
    }, []);

    useEffect(() => {
        if (scroll) {
            // == 上拉刷新 ==

            const pullingDown = async () => {
                setPullDownType('fetching');
                await refetch();
                setPullDownType('success');
                setTimeout(() => {
                    scroll.finishPullDown();
                    scroll.refresh();
                }, 500);
            };

            const enterThreshold = async () => {
                setPullDownType('enter');
            };

            const leaveThreshold = async () => {
                setPullDownType('leave');
            };

            scroll.on('pullingDown', pullingDown);
            scroll.on('enterThreshold', enterThreshold);
            scroll.on('leaveThreshold', leaveThreshold);
            // == 上拉刷新 ==

            return () => {
                scroll.off('pullingDown', pullingDown);
                scroll.off('enterThreshold', enterThreshold);
                scroll.off('leaveThreshold', leaveThreshold);
            };
        }
    }, [scroll, refetch]);

    const fetchTip = <FetchTip type={pullDownType} />;

    return { scroll, fetchTip };
}

export default useScroll;
