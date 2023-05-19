import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import BScroll from '@better-scroll/core';
import { observeElementOffset, VirtualizerOptions, observeElementRect, elementScroll, Virtualizer } from '@tanstack/react-virtual';

type Props = {
    count: number;
    enableScroll?: boolean;
    scroll: BScroll | null;
    scrollRef: React.RefObject<HTMLDivElement>;
    enableLoadMore?: { isFetchingNextPage: boolean; hasNextPage: boolean; fetchNextPage: () => Promise<any> };
};

function useVirtualizer({ scroll, scrollRef, count, enableScroll, enableLoadMore }: Props) {
    const enableLoadMoreBoolean = !!enableLoadMore;

    const requestFlag = useRef(false);

    const rerender = useReducer(() => ({}), {})[1];

    const [virtualizer, setVirtualizer] = useState<Virtualizer<HTMLDivElement, any> | null>(null);

    const [normalHeight, setNormalHeight] = useState<null | number>(null);

    const options = useMemo(() => {
        const fetchNextPage = enableLoadMore?.fetchNextPage;

        const getScrollElement = () => {
            return scrollRef.current;
        };

        const pageTurning = async (endIndex: number) => {
            if (count - (endIndex + 1) === 0) {
                if (!requestFlag.current) {
                    requestFlag.current = true;
                    if (fetchNextPage) await fetchNextPage();
                    requestFlag.current = false;
                }
            }
        };

        const scrollToFn2: VirtualizerOptions<any, any>['scrollToFn'] = (offset, _canSmooth, instance) => {
            if (enableScroll && scroll) {
                const to: [number, number] = instance.options.horizontal ? [-offset, scroll.y] : [scroll.x, -offset];
                scroll.scrollTo(...to, 300);
            }
            if (!enableScroll) {
                elementScroll(offset, _canSmooth, instance);
            }
        };

        const observeElementOffset2: VirtualizerOptions<any, any>['observeElementOffset'] = (instance, cb) => {
            if (enableScroll && scroll) {
                const handler = (e: { x: number; y: number }) => {
                    cb(-e[instance.options.horizontal ? 'x' : 'y']);
                };

                handler({ x: scroll.x, y: scroll.y });

                scroll.on('scroll', handler);

                return () => {
                    scroll.off('scroll', handler);
                };
            }
            if (!enableScroll) {
                observeElementOffset(instance, cb);
            }
        };

        const resolvedOptions: VirtualizerOptions<any, any> = {
            count: enableLoadMoreBoolean ? count + 1 : count,
            overscan: 5,
            getScrollElement,
            observeElementRect,
            getItemKey: (i) => i,
            scrollToFn: scrollToFn2,
            estimateSize: () => normalHeight || 35,
            observeElementOffset: observeElementOffset2,
            onChange: (instance) => {
                rerender();
                if (fetchNextPage) {
                    pageTurning(instance.range.endIndex);
                }
            },
        };

        return resolvedOptions;
    }, [scroll, enableScroll, normalHeight, count, enableLoadMoreBoolean]);

    useEffect(() => {
        if (!enableScroll || (enableScroll && scroll)) {
            const newVirtualizer = new Virtualizer<any, any>(options);
            (window as any)['virtualizer'] = newVirtualizer;
            setVirtualizer(newVirtualizer);
            const _didMount = newVirtualizer._didMount();
            newVirtualizer._willUpdate();
            return _didMount;
        }
    }, [enableScroll, scroll]);

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
        if (enableScroll && scroll) scroll.refresh();
    }, [totalSize, scroll]);

    // @ts-ignore
    const itemSizeCache: Map<number, number> | undefined = virtualizer?.itemSizeCache;

    useEffect(() => {
        if (normalHeight === null && itemSizeCache) {
            const secondHeight = itemSizeCache.get(1);
            if (typeof secondHeight === 'number') {
                // console.log('secondHeight', secondHeight);
                setNormalHeight(secondHeight);
            }
        }
    }, [itemSizeCache]);

    return { virtualizer, totalSize, items };
}

export default useVirtualizer;
