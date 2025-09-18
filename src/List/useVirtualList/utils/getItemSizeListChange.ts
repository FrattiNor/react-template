import { type default as useVirtualState, type SizeItem } from '../hooks/useVirtualState';

import type getMaybeRangeChange from './getMaybeRangeChange';
import type useVirtualProps from '../hooks/useVirtualProps';

type Props<T> = {
	state: ReturnType<typeof useVirtualState<T>>;
	getProps: ReturnType<typeof useVirtualProps<T>>;
	maybeRangeChange: ReturnType<typeof getMaybeRangeChange<T>>;
};

const getItemSizeListChange = <T>({ getProps, state, maybeRangeChange }: Props<T>) => {
	const { getItemSizeMap, setItemSizeList } = state;
	return () => {
		const list: SizeItem<T>[] = [];
		getProps('data').forEach((item, index) => {
			const key = getProps('getItemKey')(item);
			const size = getItemSizeMap().get(key) ?? getProps('getItemSize')(key);
			const start = typeof list[index - 1]?.end === 'number' ? list[index - 1].end + getProps('gap') : 0;
			const end = start + size;
			list.push({ index, size, start, end, key, data: item });
		});
		setItemSizeList(list);
		maybeRangeChange({ sync: false, from: 'itemSizeListChange' });
	};
};

export default getItemSizeListChange;
