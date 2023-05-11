import MouseWheel from '@better-scroll/mouse-wheel';
import ScrollBar from '@better-scroll/scroll-bar';
import PullDown from '@better-scroll/pull-down';
import { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';

BScroll.use(ScrollBar);
BScroll.use(PullDown);
BScroll.use(MouseWheel);

const ARROW_BOTTOM =
    '<svg width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M367.997 338.75l-95.998 95.997V17.503h-32v417.242l-95.996-95.995l-22.627 22.627L256 496l134.624-134.623l-22.627-22.627z"></path></svg>';
const ARROW_UP =
    '<svg width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M390.624 150.625L256 16L121.376 150.625l22.628 22.627l95.997-95.998v417.982h32V77.257l95.995 95.995l22.628-22.627z"></path></svg>';

const PHASE = {
    moving: {
        enter: 'enter',
        leave: 'leave',
    },
    fetching: 'fetching',
    succeed: 'succeed',
};

function useScroll() {
    const [tip, setTip] = useState('');
    const [scroll, setScroll] = useState<BScroll | null>(null);

    useEffect(() => {
        const e = document.getElementById('scroll-wrapper') as HTMLDivElement;

        const bs = new BScroll(e, {
            click: true,
            scrollX: false,
            scrollbar: true,
            bounce: {
                bottom: false,
            },
            pullDownRefresh: {
                threshold: 70,
                stop: 56,
            },
            mouseWheel: {
                speed: 20,
                invert: false,
                easeTime: 300,
            },
            probeType: 3,
        });

        setScroll(bs);

        // == 上拉刷新 ==
        const setTipText = (phase: string) => {
            const TEXTS_MAP: Record<string, string> = {
                enter: `${ARROW_BOTTOM} Pull down`,
                leave: `${ARROW_UP} Release`,
                fetching: 'Loading...',
                succeed: 'Refresh succeed',
            };
            setTip(TEXTS_MAP[phase]);
        };

        const getData = () => {
            return new Promise((res) => {
                setTimeout(() => {
                    res(0);
                }, 3000);
            });
        };

        bs.on('pullingDown', async () => {
            setTipText(PHASE.fetching);
            await getData();
            setTipText(PHASE.succeed);
            setTimeout(() => {
                bs.finishPullDown();
                bs.refresh();
            }, 500);
        });

        bs.on('enterThreshold', () => {
            setTipText(PHASE.moving.enter);
        });

        bs.on('leaveThreshold', () => {
            setTipText(PHASE.moving.leave);
        });
        // == 上拉刷新 ==

        return () => {
            bs.destroy();
        };
    }, []);

    return { scroll, tip };
}

export default useScroll;
