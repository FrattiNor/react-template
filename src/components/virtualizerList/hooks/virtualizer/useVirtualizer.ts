import { useEffect, useMemo, useReducer, useState } from 'react';
import BScroll from '@better-scroll/core';
import {
    observeElementOffset as _observeElementOffset,
    VirtualizerOptions,
    observeElementRect,
    elementScroll,
    Virtualizer,
} from '@tanstack/react-virtual';

type Props = {
    count: number;
    enableScroll?: boolean;
    scroll: BScroll | null;
    scrollRef: React.RefObject<HTMLDivElement>;
};

function useVirtualizer({ scroll, scrollRef, count, enableScroll }: Props) {
    const rerender = useReducer(() => ({}), {})[1];

    const [virtualizer, setVirtualizer] = useState<Virtualizer<HTMLDivElement, any> | null>(null);

    const [normalHeight, setNormalHeight] = useState<null | number>(null);

    const options = useMemo(() => {
        const getScrollElement = () => {
            return scrollRef.current;
        };

        const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] = (offset, _canSmooth, instance) => {
            if (enableScroll && scroll) {
                const to: [number, number] = instance.options.horizontal ? [-offset, scroll.y] : [scroll.x, -offset];
                scroll.scrollTo(...to, 300);
            }
            if (!enableScroll) {
                elementScroll(offset, _canSmooth, instance);
            }
        };

        const observeElementOffset: VirtualizerOptions<any, any>['observeElementOffset'] = (instance, cb) => {
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
                _observeElementOffset(instance, cb);
            }
        };

        const resolvedOptions: VirtualizerOptions<any, any> = {
            count,
            scrollToFn,
            overscan: 5,
            getScrollElement,
            observeElementRect,
            observeElementOffset,
            getItemKey: (i) => i,
            estimateSize: () => normalHeight || 35,
            onChange: () => {
                rerender();
            },
        };

        return resolvedOptions;
    }, [enableScroll, scroll, normalHeight, count]);

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
        if (scroll) scroll.refresh();
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
