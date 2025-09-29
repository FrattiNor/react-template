import type useVirtualState from '../hooks/useVirtualState';

type Props<T> = {
	state: ReturnType<typeof useVirtualState<T>>;
};

const getVirtualItems = <T>({ state }: Props<T>) => {
	const { getRange, getItemSizeList } = state;
	const range = getRange();
	const itemSizeList = getItemSizeList();
	if (itemSizeList === null || itemSizeList.length === 0 || range === null) return [];
	return itemSizeList.slice(range[0], range[1] + 1);
};

export default getVirtualItems;
