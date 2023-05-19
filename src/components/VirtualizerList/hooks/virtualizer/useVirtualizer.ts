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

function useVirtualizer({ scroll, scrollRef, count: c, enableScroll, enableLoadMore }: Props) {
    const enableScrollBoolean = !!enableScroll;
    const enableLoadMoreBoolean = !!enableLoadMore;
    const count = enableLoadMoreBoolean ? c + 1 : c;
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
            if (count - (endIndex + 1) <= 0) {
                if (!requestFlag.current) {
                    requestFlag.current = true;
                    if (fetchNextPage) await fetchNextPage();
                    requestFlag.current = false;
                }
            }
        };

        const scrollToFn2: VirtualizerOptions<any, any>['scrollToFn'] = (offset, _canSmooth, instance) => {
            if (enableScrollBoolean && scroll) {
                const to: [number, number] = instance.options.horizontal ? [-offset, scroll.y] : [scroll.x, -offset];
                scroll.scrollTo(...to, 300);
            }
            if (!enableScrollBoolean) {
                elementScroll(offset, _canSmooth, instance);
            }
        };

        const observeElementOffset2: VirtualizerOptions<any, any>['observeElementOffset'] = (instance, cb) => {
            if (enableScrollBoolean && scroll) {
                const handler = (e: { x: number; y: number }) => {
                    cb(-e[instance.options.horizontal ? 'x' : 'y']);
                };

                handler({ x: scroll.x, y: scroll.y });

                scroll.on('scroll', handler);

                return () => {
                    scroll.off('scroll', handler);
                };
            }
            if (!enableScrollBoolean) {
                observeElementOffset(instance, cb);
            }
        };

        const resolvedOptions: VirtualizerOptions<any, any> = {
            count,
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
    }, [scroll, count, normalHeight, enableScrollBoolean, enableLoadMore?.fetchNextPage]);

    useEffect(() => {
        if (!enableScrollBoolean || (enableScrollBoolean && scroll)) {
            const newVirtualizer = new Virtualizer<any, any>(options);
            (window as any)['virtualizer'] = newVirtualizer;
            setVirtualizer(newVirtualizer);
            const _didMount = newVirtualizer._didMount();
            newVirtualizer._willUpdate();
            return _didMount;
        }
    }, [enableScrollBoolean, scroll]);

    useEffect(() => {
        if (virtualizer) {
            virtualizer.setOptions(options);
            virtualizer._willUpdate();
            rerender();
        }
    }, [options, virtualizer]);

    const vTotalSize = virtualizer?.getTotalSize() || 0;

    const vItems = virtualizer?.getVirtualItems() || [];
    // virtualizerCount跟随items变更，解决items更新比data.length慢的问题
    const vCount = virtualizer?.options.count || 0;

    useEffect(() => {
        if (enableScrollBoolean && scroll) scroll.refresh();
    }, [vTotalSize, scroll]);

    // @ts-ignore
    const itemSizeCache: Map<number, number> | undefined = virtualizer?.itemSizeCache;

    useEffect(() => {
        if (normalHeight === null && itemSizeCache) {
            const secondHeight = itemSizeCache.get(1);
            if (typeof secondHeight === 'number') {
                setNormalHeight(secondHeight);
            }
        }
    }, [itemSizeCache]);

    return { virtualizer, vTotalSize, vItems, vCount };
}

export default useVirtualizer;
