import * as React from 'react';
import { flushSync } from 'react-dom';

import {
	Virtualizer,
	observeElementRect,
	observeElementOffset,
	type VirtualizerOptions,
	type PartialKeys,
	type ScrollToOptions,
} from '@tanstack/react-virtual';

import { measureElement } from './utils';

const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

type Range = { startIndex: number; endIndex: number };

function useVirtualizerBase<TScrollElement extends Element | Window, TItemElement extends Element>(
	options: VirtualizerOptions<TScrollElement, TItemElement>,
): Virtualizer<TScrollElement, TItemElement> {
	const rangeRef = React.useRef<Range | null>(null);
	const timeoutRef = React.useRef<number | null>(null);
	const rerender = React.useReducer(() => ({}), {})[1];

	const resolvedOptions: VirtualizerOptions<TScrollElement, TItemElement> = {
		...options,
		onChange: (instance, sync) => {
			if (sync && (instance.range?.startIndex !== rangeRef.current?.startIndex || instance.range?.endIndex !== rangeRef.current?.endIndex)) {
				rangeRef.current = instance.range;
				if (timeoutRef.current === null) {
					flushSync(rerender);
					window.requestAnimationFrame(() => {
						timeoutRef.current = null;
					});
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

export function useVirtualizer<TScrollElement extends Element, TItemElement extends Element>(
	options: Omit<PartialKeys<VirtualizerOptions<TScrollElement, TItemElement>, 'observeElementRect' | 'observeElementOffset'>, 'scrollToFn'>,
): Virtualizer<TScrollElement, TItemElement> {
	const _virtualizer = useVirtualizerBase<TScrollElement, TItemElement>({
		measureElement,
		observeElementRect,
		observeElementOffset,
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
			const offsetRes = _virtualizer.getOffsetForIndex(index, align);
			const offset = offsetRes?.[0];
			if (typeof offset === 'number') {
				_virtualizer.scrollElement.scrollTo({ [_virtualizer.options.horizontal ? 'left' : 'top']: offset, behavior });
			}
		}
	};

	const virtualizer = {
		..._virtualizer,
		scrollToIndex,
		scrollToOffset,
	};

	return virtualizer as Virtualizer<TScrollElement, TItemElement>;
}

export type { Virtualizer };
