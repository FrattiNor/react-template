import type getMaybeChangeItemSize from './getMaybeChangeItemSize';
import type useItemObserver from '../hooks/useItemObserver';
import type useVirtualProps from '../hooks/useVirtualProps';
import type useVirtualState from '../hooks/useVirtualState';

type Props<T> = {
	state: ReturnType<typeof useVirtualState<T>>;
	itemObserver: ReturnType<typeof useItemObserver<T>>;
	getProps: ReturnType<typeof useVirtualProps<T>>;
	maybeChangeItemSize: ReturnType<typeof getMaybeChangeItemSize>;
};

const getMeasureElement = <T>({ state, itemObserver, getProps, maybeChangeItemSize }: Props<T>) => {
	const { getItemElementMap } = state;

	return (element: HTMLDivElement | null, item: T) => {
		const key = getProps('getItemKey')(item);
		if (element !== null && element.isConnected) {
			const itemNewSize = getProps('direction') === 'h' ? element.clientWidth : element.clientHeight;
			maybeChangeItemSize(key, itemNewSize);

			const oldElement = getItemElementMap().get(key);
			if (oldElement !== element) {
				getItemElementMap().set(key, element);
				itemObserver.observe(element);
			}
		} else {
			const oldElement = getItemElementMap().get(key);
			if (oldElement) itemObserver.unobserve(oldElement);
			getItemElementMap().delete(key);
		}
	};
};

export default getMeasureElement;
