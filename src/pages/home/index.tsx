import { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';
import PullUp from '@better-scroll/pull-up';
import MouseWheel from '@better-scroll/mouse-wheel';
import PullDown from '@better-scroll/pull-down';
import ScrollBar from '@better-scroll/scroll-bar';
import InfinityScroll from '@better-scroll/infinity';
import ObserveDOM from '@better-scroll/observe-dom';
import Inner from './inner';

BScroll.use(ObserveDOM);
BScroll.use(ScrollBar);
BScroll.use(PullDown);
BScroll.use(MouseWheel);
BScroll.use(PullUp);
BScroll.use(InfinityScroll);

const ARROW_BOTTOM =
    '<svg width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M367.997 338.75l-95.998 95.997V17.503h-32v417.242l-95.996-95.995l-22.627 22.627L256 496l134.624-134.623l-22.627-22.627z"></path></svg>';
const ARROW_UP =
    '<svg width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M390.624 150.625L256 16L121.376 150.625l22.628 22.627l95.997-95.998v417.982h32V77.257l95.995 95.995l22.628-22.627z"></path></svg>';

// pulldownRefresh state
const PHASE = {
    moving: {
        enter: 'enter',
        leave: 'leave',
    },
    fetching: 'fetching',
    succeed: 'succeed',
};

function App() {
    const [tip, setTip] = useState('');
    const [bs, setBs] = useState<BScroll | null>(null);

    useEffect(() => {
        const e = document.getElementById('scroll-wrapper') as HTMLDivElement;

        const bs = new BScroll(e, {
            click: true,
            scrollX: false,
            scrollbar: true,
            // observeDOM: true,
            bounce: {
                // top: false,
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

        // bs.on('scroll', (e: any) => {
        //     console.log(e);
        // });

        setBs(bs);

        return () => {
            bs.destroy();
        };
    }, []);

    return <Inner bs={bs} tip={tip} />;
}

export default App;
//
