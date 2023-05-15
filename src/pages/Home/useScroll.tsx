import MouseWheel from '@better-scroll/mouse-wheel';
import ScrollBar from '@better-scroll/scroll-bar';
import PullDown from '@better-scroll/pull-down';
import { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';
import Iconfont from '@/iconfont';

BScroll.use(MouseWheel);
BScroll.use(ScrollBar);
BScroll.use(PullDown);

type PullDownTip = '' | 'enter' | 'leave' | 'fetching' | 'success';

type Props = {
    scrollRef: React.RefObject<HTMLDivElement>;
    tipRef: React.RefObject<HTMLDivElement>;
    refetch: () => Promise<any>;
};

function useScroll({ scrollRef, tipRef, refetch }: Props) {
    const [pullDownTip, setPullDownTip] = useState<PullDownTip>('');
    const [scroll, setScroll] = useState<BScroll | null>(null);

    useEffect(() => {
        if (scrollRef.current) {
            const pullDownTipHeight = tipRef.current?.clientHeight || 65;

            const newScroll = new BScroll(scrollRef.current, {
                click: true,
                scrollX: false,
                scrollbar: {
                    minSize: 20,
                },
                bounce: {
                    top: true,
                    left: false,
                    right: false,
                    bottom: false,
                },
                pullDownRefresh: {
                    threshold: pullDownTipHeight * 1.1,
                    stop: pullDownTipHeight,
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
                setPullDownTip('fetching');
                await refetch();
                setPullDownTip('success');
                setTimeout(() => {
                    scroll.finishPullDown();
                    scroll.refresh();
                }, 500);
            };

            const enterThreshold = async () => {
                setPullDownTip('enter');
            };

            const leaveThreshold = async () => {
                setPullDownTip('leave');
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

    const getPullDownTip = () => {
        switch (pullDownTip) {
            case 'enter':
                return (
                    <span>
                        <Iconfont icon="arrow-down" />
                        <span> 下拉刷新</span>
                    </span>
                );
            case 'leave':
                return (
                    <span>
                        <Iconfont icon="arrow-up" />
                        <span> 释放刷新</span>
                    </span>
                );
            case 'fetching':
                return <span>加载中...</span>;
            case 'success':
                return <span>刷新成功</span>;
            default:
                return <span>占位</span>;
        }
    };

    return { scroll, getPullDownTip };
}

export default useScroll;
