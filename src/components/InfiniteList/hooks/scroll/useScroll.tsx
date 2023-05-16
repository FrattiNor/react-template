import LoadingIcon from '../../components/LoadingIcon';
import { useEffect, useMemo, useState } from 'react';
import MouseWheel from '@better-scroll/mouse-wheel';
import PullDown from '@better-scroll/pull-down';
import Iconfont from '@/components/Iconfont';
import BScroll from '@better-scroll/core';
import ScrollBar from './scrollbar';

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

    const fetchTip = useMemo(() => {
        switch (pullDownType) {
            case 'enter':
                return (
                    <span>
                        <Iconfont icon="arrow-down" />
                        <span>{` 下拉刷新`}</span>
                    </span>
                );
            case 'leave':
                return (
                    <span>
                        <Iconfont icon="arrow-up" />
                        <span>{` 释放立即刷新`}</span>
                    </span>
                );
            case 'fetching':
                return (
                    <span>
                        <span>{`加载中 `}</span>
                        <LoadingIcon />
                    </span>
                );
            case 'success':
                return <span>{`刷新成功`}</span>;
            default:
                return <span>{`-`}</span>;
        }
    }, [pullDownType]);

    return { scroll, fetchTip };
}

export default useScroll;
