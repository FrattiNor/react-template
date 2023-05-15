import { useCallback, useEffect, useMemo, useReducer, useRef, useState, useLayoutEffect } from 'react';
import { Virtualizer, VirtualizerOptions, observeElementRect } from '@tanstack/react-virtual';
import BScroll from '@better-scroll/core';

type Props = {
    count: number;
    scroll: BScroll | null;
    getNextPage: () => Promise<any>;
    scrollWrapperRef: React.RefObject<HTMLDivElement>;
};

function useVirtualizer({ scroll, scrollWrapperRef, count, getNextPage }: Props) {
    const requestFlag = useRef(false);

    const rerender = useReducer(() => ({}), {})[1];

    const [virtualizer, setVirtualizer] = useState<Virtualizer<HTMLDivElement, any> | null>(null);

    const totalSize = virtualizer?.getTotalSize();

    const items = virtualizer?.getVirtualItems();

    const getScrollElement = useCallback(() => {
        return scrollWrapperRef.current;
    }, []);

    // count 和 getNextPage 是一起变的
    const pageTurning = useCallback(
        async (endIndex: number) => {
            if (count - (endIndex + 1) < 5) {
                if (!requestFlag.current) {
                    requestFlag.current = true;
                    await getNextPage();
                    requestFlag.current = false;
                }
            }
        },
        [count, getNextPage],
    );

    const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] = useCallback(
        (offset, _canSmooth, instance) => {
            if (scroll) {
                const to: [number, number] = instance.options.horizontal ? [-offset, scroll.y] : [scroll.x, -offset];
                scroll.scrollTo(...to, 300);
            }
        },
        [scroll],
    );

    const observeElementOffset: VirtualizerOptions<any, any>['observeElementOffset'] = useCallback(
        (instance, cb) => {
            if (scroll) {
                const handler = (e: { x: number; y: number }) => {
                    cb(-e[instance.options.horizontal ? 'x' : 'y']);
                };

                handler({ x: scroll.x, y: scroll.y });

                scroll.on('scroll', handler);

                return () => {
                    scroll.off('scroll', handler);
                };
            }
        },
        [scroll],
    );

    const resolvedOptions: VirtualizerOptions<any, any> = useMemo(
        () => ({
            count,
            scrollToFn,
            overscan: 0,
            getScrollElement,
            observeElementRect,
            observeElementOffset,
            getItemKey: (i) => i,
            estimateSize: () => 35,
            onChange: (instance) => {
                rerender();
                pageTurning(instance.range.endIndex);
            },
        }),
        [count, scroll, pageTurning],
    );

    useEffect(() => {
        if (scroll) scroll.refresh();
    }, [totalSize, scroll]);

    useEffect(() => {
        if (scroll) {
            setVirtualizer(new Virtualizer<any, any>(resolvedOptions));
        }
    }, [scroll]);

    useEffect(() => {
        if (virtualizer) {
            return virtualizer._didMount();
        }
    }, [virtualizer]);

    useLayoutEffect(() => {
        if (virtualizer) {
            virtualizer?.setOptions(resolvedOptions);
            return virtualizer._willUpdate();
        }
    });

    return { virtualizer, totalSize, items };
}

export default useVirtualizer;
