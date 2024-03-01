import * as React from 'react';
import { flushSync } from 'react-dom';

import { VirtualizerOptions, Virtualizer, PartialKeys, observeElementRect, observeElementOffset, elementScroll } from '@tanstack/react-virtual';

const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

type VirtualizerBaseProps<TScrollElement extends Element | Window, TItemElement extends Element> = {
    options: VirtualizerOptions<TScrollElement, TItemElement>;
    maxCounter: number;
};

function useVirtualizerBase<TScrollElement extends Element | Window, TItemElement extends Element>({
    options,
    maxCounter,
}: VirtualizerBaseProps<TScrollElement, TItemElement>): Virtualizer<TScrollElement, TItemElement> {
    // 强制渲染计数器
    const syncCounter = React.useRef(0);
    const rerender = React.useReducer(() => ({}), {})[1];

    const resolvedOptions: VirtualizerOptions<TScrollElement, TItemElement> = {
        ...options,
        onChange: (instance, sync) => {
            console.log(instance);
            if (sync) {
                // 计数器到达阈值触发强制渲染
                if (typeof maxCounter === 'number' && syncCounter.current >= maxCounter) {
                    syncCounter.current = 0; // 重置计数器
                    flushSync(rerender);
                } else {
                    syncCounter.current++; // 增加计数器
                    rerender();
                }
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

type VirtualizerProps<TScrollElement extends Element, TItemElement extends Element> = {
    options: PartialKeys<VirtualizerOptions<TScrollElement, TItemElement>, 'observeElementRect' | 'observeElementOffset' | 'scrollToFn'>;
    maxCounter?: number;
};

export function useVirtualizer<TScrollElement extends Element, TItemElement extends Element>({
    options,
    maxCounter = 0,
}: VirtualizerProps<TScrollElement, TItemElement>): Virtualizer<TScrollElement, TItemElement> {
    return useVirtualizerBase<TScrollElement, TItemElement>({
        maxCounter,
        options: {
            observeElementRect: observeElementRect,
            observeElementOffset: observeElementOffset,
            scrollToFn: elementScroll,
            ...options,
        },
    });
}
