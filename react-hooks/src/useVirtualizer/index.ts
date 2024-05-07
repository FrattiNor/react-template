import * as React from 'react';
import { flushSync } from 'react-dom';

import { Virtualizer, observeElementRect, observeElementOffset } from '@tanstack/react-virtual';

import type { VirtualizerOptions, PartialKeys, ScrollToOptions } from '@tanstack/react-virtual';

const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

type Range = { startIndex: number; endIndex: number };

function useVirtualizerBase<TScrollElement extends Element | Window, TItemElement extends Element>(
    options: VirtualizerOptions<TScrollElement, TItemElement>,
): Virtualizer<TScrollElement, TItemElement> {
    const timeout = React.useRef<number | null>(null);
    const rangeRef = React.useRef<Range | null>(null);
    const rerender = React.useReducer(() => ({}), {})[1];

    const resolvedOptions: VirtualizerOptions<TScrollElement, TItemElement> = {
        ...options,
        onChange: (instance, sync) => {
            if (sync && (instance.range?.startIndex !== rangeRef.current?.startIndex || instance.range?.endIndex !== rangeRef.current?.endIndex)) {
                rangeRef.current = instance.range;
                if (timeout.current) cancelAnimationFrame(timeout.current);
                timeout.current = requestAnimationFrame(() => {
                    flushSync(rerender);
                });
            } else {
                rerender();
            }
            options.onChange?.(instance, sync);
        },
    };

    const [instance] = React.useState(() => new Virtualizer<TScrollElement, TItemElement>(resolvedOptions));

    instance.setOptions(resolvedOptions);

    React.useEffect(() => {
        return instance._didMount();
    }, []);

    useIsomorphicLayoutEffect(() => {
        return instance._willUpdate();
    });

    return instance;
}

export function useVirtualizer<TScrollElement extends Element, TItemElement extends Element>(
    options: Omit<PartialKeys<VirtualizerOptions<TScrollElement, TItemElement>, 'observeElementRect' | 'observeElementOffset'>, 'scrollToFn'>,
): Virtualizer<TScrollElement, TItemElement> {
    const _virtualizer = useVirtualizerBase<TScrollElement, TItemElement>({
        observeElementRect: observeElementRect,
        observeElementOffset: observeElementOffset,
        ...options,
        scrollToFn: () => {
            // 屏蔽掉组件的scrollTo函数
            return;
        },
    });

    // 添加 scrollToOffset
    const scrollToOffset = (offset: number, option?: { behavior: ScrollBehavior | undefined }) => {
        if (_virtualizer.scrollElement) {
            const { behavior } = option || {};
            _virtualizer.scrollElement.scrollTo({ [_virtualizer.options.horizontal ? 'left' : 'top']: offset, behavior });
        }
    };

    // 添加 scrollToIndex
    const scrollToIndex = (index: number, option?: ScrollToOptions) => {
        if (_virtualizer.scrollElement) {
            const { align = 'auto', behavior } = option || {};
            const [offset] = _virtualizer.getOffsetForIndex(index, align);
            _virtualizer.scrollElement.scrollTo({ [_virtualizer.options.horizontal ? 'left' : 'top']: offset, behavior });
        }
    };

    // 组件库getVirtualItems有Bug，range和calculateRange计算的结果不一致，导致getVirtualItems的值不正确
    // 最终以range为准
    // 原因为resizeItem未使用maybeNotify，导致maybeNotify的依赖range未改变，导致一直使用的是缓存数据
    const getVirtualItems = () => {
        const range = _virtualizer.range;
        const rangeCount = range ? range.endIndex - range.startIndex + 1 : 0;
        let virtualItems = _virtualizer.getVirtualItems();
        // 如果range和virtualItems一致，直接返回即可，否则使用range重新计算
        if (virtualItems.length >= rangeCount) return virtualItems;
        // @ts-ignore
        const measurements = _virtualizer.getMeasurements();
        virtualItems = [];
        if (range === null) return virtualItems;
        for (let i = range.startIndex; i <= range.endIndex; i++) {
            const measurement = measurements[i]!;
            virtualItems.push(measurement);
        }
        return virtualItems;
    };

    const virtualizer = {
        ..._virtualizer,
        scrollToIndex,
        scrollToOffset,
        getVirtualItems,
    };

    return virtualizer as Virtualizer<TScrollElement, TItemElement>;
}

export type { Virtualizer };
