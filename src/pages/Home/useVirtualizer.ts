import { Virtualizer, VirtualizerOptions, observeElementRect } from '@tanstack/react-virtual';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import BScroll from '@better-scroll/core';

type Props = {
    count: number;
    scroll: BScroll | null;
    fetchNextPage: () => Promise<any>;
    scrollRef: React.RefObject<HTMLDivElement>;
};

function useVirtualizer({ scroll, scrollRef, count, fetchNextPage }: Props) {
    const requestFlag = useRef(false);

    const rerender = useReducer(() => ({}), {})[1];

    const [virtualizer, setVirtualizer] = useState<Virtualizer<HTMLDivElement, any> | null>(null);

    const [normalHeight, setNormalHeight] = useState<number>(35);

    const options = useMemo(() => {
        const getScrollElement = () => {
            return scrollRef.current;
        };

        const pageTurning = async (endIndex: number) => {
            if (count - (endIndex + 1) < 5) {
                if (!requestFlag.current) {
                    requestFlag.current = true;
                    await fetchNextPage();
                    requestFlag.current = false;
                }
            }
        };

        const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] = (offset, _canSmooth, instance) => {
            if (scroll) {
                const to: [number, number] = instance.options.horizontal ? [-offset, scroll.y] : [scroll.x, -offset];
                scroll.scrollTo(...to, 300);
            }
        };

        const observeElementOffset: VirtualizerOptions<any, any>['observeElementOffset'] = (instance, cb) => {
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
        };

        const resolvedOptions: VirtualizerOptions<any, any> = {
            count,
            scrollToFn,
            overscan: 0,
            getScrollElement,
            observeElementRect,
            observeElementOffset,
            getItemKey: (i) => i,
            estimateSize: () => normalHeight,
            onChange: (instance) => {
                rerender();
                pageTurning(instance.range.endIndex);
            },
        };

        return resolvedOptions;
    }, [scroll, normalHeight, count, fetchNextPage]);

    useEffect(() => {
        if (scroll) {
            const newVirtualizer = new Virtualizer<any, any>(options);
            (window as any)['virtualizer'] = newVirtualizer;
            setVirtualizer(newVirtualizer);
            const _didMount = newVirtualizer._didMount();
            newVirtualizer._willUpdate();
            return _didMount;
        }
    }, [scroll]);

    useEffect(() => {
        if (virtualizer) {
            virtualizer.setOptions(options);
            virtualizer._willUpdate();
            rerender();
        }
    }, [options, virtualizer]);

    const totalSize = virtualizer?.getTotalSize() || 0;

    const items = virtualizer?.getVirtualItems() || [];

    useEffect(() => {
        if (scroll) scroll.refresh();
    }, [totalSize, scroll]);

    useEffect(() => {
        if (normalHeight === 35 && items.length > 0) {
            setNormalHeight(items[0].size);
        }
    }, [items]);

    return { virtualizer, totalSize, items };
}

export default useVirtualizer;
