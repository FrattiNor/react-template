import type getItemSizeListChange from './getItemSizeListChange';
import type useVirtualProps from '../hooks/useVirtualProps';
import type useVirtualState from '../hooks/useVirtualState';

type Props<T> = {
	state: ReturnType<typeof useVirtualState<T>>;
	getProps: ReturnType<typeof useVirtualProps<T>>;
	itemSizeListChange: ReturnType<typeof getItemSizeListChange<T>>;
};

const getMaybeChangeItemSize = <T>({ state, getProps, itemSizeListChange }: Props<T>) => {
	const { getItemSizeMap } = state;
	return (key: string, itemNewSize: number) => {
		const itemDefaultSize = getProps('getItemSize')(key);
		const itemOldSize = getItemSizeMap().get(key) ?? itemDefaultSize;
		if (itemNewSize !== itemOldSize) {
			if (itemNewSize !== itemDefaultSize) {
				getItemSizeMap().set(key, itemNewSize);
				itemSizeListChange();
			} else {
				getItemSizeMap().delete(key);
				itemSizeListChange();
			}
		}
	};
};

export default getMaybeChangeItemSize;
