/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PartialKeys, Virtualizer, VirtualizerOptions, elementScroll, observeElementOffset, observeElementRect } from '@tanstack/react-virtual';
import { useEffect, useLayoutEffect, useReducer, useState } from 'react';

export function useVirtualizerBase2<TScrollElement extends Element | Window, TItemElement extends Element>(
    options: PartialKeys<VirtualizerOptions<TScrollElement, TItemElement>, 'observeElementRect' | 'observeElementOffset' | 'scrollToFn'>,
    condition: () => boolean,
): Virtualizer<TScrollElement, TItemElement> {
    const rerender = useReducer(() => ({}), {})[1];

    const resolvedOptions: VirtualizerOptions<TScrollElement, TItemElement> = {
        // @ts-ignore
        observeElementRect: observeElementRect,
        // @ts-ignore
        observeElementOffset: observeElementOffset,
        // @ts-ignore
        scrollToFn: elementScroll,
        ...options,
        onChange: (instance) => {
            rerender();
            options.onChange?.(instance);
        },
    };

    const [instance] = useState(() => new Virtualizer<TScrollElement, TItemElement>(resolvedOptions));

    instance.setOptions(resolvedOptions);

    useEffect(() => {
        if (condition()) {
            return instance._didMount();
        }
        return () => {
            // empty
        };
    }, [condition]);

    const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? useLayoutEffect : useEffect;

    useIsomorphicLayoutEffect(() => {
        if (condition()) {
            return instance._willUpdate();
        }
        return () => {
            // empty
        };
    });

    return instance;
}
