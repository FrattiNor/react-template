/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { VirtualizerOptions } from '@tanstack/react-virtual';
import BScroll from '@better-scroll/core';
import styles from './index.module.less';
import classNames from 'classnames';
import { useVirtualizerBase2 } from './utils';

type Props = {
    bs: BScroll | null;
    tip: string;
};

const Inner: FC<Props> = ({ bs, tip }) => {
    const requestFlag = useRef(false);
    const [count, setCount] = useState(100);
    const [visibles, setVisibles] = useState<Record<string, boolean>>({});

    const pageTurning = useCallback(
        (endIndex: number) => {
            console.log('endIndex', endIndex);
            if (count - (endIndex + 1) < 5) {
                if (!requestFlag.current) {
                    requestFlag.current = true;
                    setTimeout(() => {
                        setCount((c) => c + 100);
                        requestFlag.current = false;
                    }, 100);
                }
            }
        },
        [count],
    );

    const getScrollElement = useCallback(() => {
        return document.getElementById('scroll-wrapper') as HTMLDivElement;
    }, []);

    const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] = useCallback(
        (offset, _canSmooth, instance) => {
            if (bs) {
                console.log('bs', offset);
                const to: [number, number] = instance.options.horizontal ? [-offset, bs.y] : [bs.x, -offset];
                bs.scrollTo(...to, 300, undefined, undefined);
            }
            {
                console.log('scrollToFn', offset);
                // elementScroll(offset, canSmooth, instance);
            }
        },
        [bs],
    );

    const observeElementOffset: VirtualizerOptions<any, any>['observeElementOffset'] = useCallback(
        (instance, cb) => {
            console.log('observeElementOffset', bs);
            if (bs) {
                const handler = (e: any) => {
                    console.log('observeElementOffset', -e[instance.options.horizontal ? 'x' : 'y']);
                    cb(-e[instance.options.horizontal ? 'x' : 'y']);
                };

                handler({ x: 0, y: 0 });

                bs.on('scroll', handler);

                return () => {
                    bs.off('scroll', handler);
                };
            } else {
                const element = getScrollElement();

                const handler = () => {
                    console.log(element[instance.options.horizontal ? 'scrollLeft' : 'scrollTop']);
                    cb(element[instance.options.horizontal ? 'scrollLeft' : 'scrollTop']);
                };

                handler();

                element.addEventListener('scroll', handler, {
                    passive: true,
                });

                return () => {
                    element.removeEventListener('scroll', handler);
                };
            }
        },
        [bs],
    );

    const condition = useCallback(() => {
        return !!bs;
    }, [bs]);

    const rowVirtualizer = useVirtualizerBase2(
        {
            onChange: (v) => pageTurning(v.range.endIndex),
            estimateSize: () => 35,
            getItemKey: (i) => i,
            getScrollElement,
            count: count,
            overscan: 5,
            scrollToFn,
            observeElementOffset,
        },
        condition,
    );

    const items = rowVirtualizer.getVirtualItems();

    useEffect(() => {
        if (bs) bs.refresh();
    }, [rowVirtualizer.getTotalSize(), bs]);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['handle']}>
                <button onClick={() => rowVirtualizer.scrollToOffset(0)}>顶部</button>
                <button onClick={() => rowVirtualizer.scrollToIndex(count / 2)}>中间</button>
                <button onClick={() => rowVirtualizer.scrollToIndex(count - 1)}>底部</button>
            </div>

            <div id="scroll-wrapper" className={styles['scroll-wrapper']}>
                <div className={styles['container']} style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
                    <div dangerouslySetInnerHTML={{ __html: tip }} className={styles['pulldown-wrapper']} />
                    <div className={styles['container-inner']} style={{ transform: `translateY(${items[0].start}px)` }}>
                        {items.map((virtualItem) => (
                            <div
                                key={virtualItem.key}
                                data-index={virtualItem.index}
                                ref={rowVirtualizer.measureElement}
                                className={classNames(styles['item'], {
                                    [styles['open']]: visibles[virtualItem.key],
                                    [styles['first']]: virtualItem.index === 0,
                                    [styles['even']]: !(virtualItem.index % 2),
                                    [styles['odd']]: virtualItem.index % 2,
                                })}
                                onClick={() => setVisibles((v) => ({ ...v, [virtualItem.key]: !v[virtualItem.key] }))}
                            >
                                Row {virtualItem.index}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inner;
//
