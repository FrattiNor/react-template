import { type VirtualListFieldKeys } from '../../type';
import { getItemProps } from '../utils';

export const getSelectedKeysMap = <K>(selectedKeys: K[]) => {
	const map = new Map<K, boolean>();
	selectedKeys.forEach((key) => map.set(key, true));
	return map;
};

type GetSelectedItemsProps<T, K> = {
	data?: T[];
	fieldKeys: VirtualListFieldKeys<T, K>;
	selectedKeysMap: Map<K, boolean>;
};

// 获取选中的节点数据
export const getSelectedItems = <T, K>({ data, fieldKeys, selectedKeysMap }: GetSelectedItemsProps<T, K>) => {
	const selectedItems: T[] = [];
	data?.forEach((item) => {
		const { key } = getItemProps(item, fieldKeys);
		if (selectedKeysMap.get(key)) selectedItems.push(item);
	});
	return selectedItems;
};
