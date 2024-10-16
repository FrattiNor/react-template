import { type VirtualTreeFieldKeys } from '../../type';
import { getItemProps } from '../utils';

export const getSelectedKeysMap = <K>(selectedKeys: K[]) => {
	const map = new Map<K, boolean>();
	selectedKeys.forEach((key) => map.set(key, true));
	return map;
};

type GetSelectedItemsProps<T, K> = {
	data?: T[];
	fieldKeys: VirtualTreeFieldKeys<T, K>;
	selectedKeysMap: Map<K, boolean>;
};

// 获取选中的节点数据
export const getSelectedItems = <T, K>({ data, fieldKeys, selectedKeysMap }: GetSelectedItemsProps<T, K>) => {
	const selectedItems: T[] = [];
	if (data) {
		const recursion = (_data: T[]) => {
			_data.forEach((item) => {
				const { key, children, haveChildren } = getItemProps(item, fieldKeys);
				if (selectedKeysMap.get(key)) selectedItems.push(item);
				if (haveChildren) recursion(children);
			});
		};
		recursion(data);
	}
	return selectedItems;
};

type GetNotCheckStrictlySelectedProps<T, K> = {
	data?: T[];
	fieldKeys: VirtualTreeFieldKeys<T, K>;
	selectedKeysMap: Map<K, boolean>;
};

export const getNotCheckStrictlySelected = <T, K>({ data, fieldKeys, selectedKeysMap }: GetNotCheckStrictlySelectedProps<T, K>) => {
	// 搜索到的父Id
	let nextSelectedKeys: K[] = [];
	// 遍历数据
	type Props = { level: number; parentSelected: boolean };
	const recursionData = (v: T[], opt?: Props) => {
		const { level = 0, parentSelected = false } = opt || {};

		let allSelected = true;

		// 临时选中的keys
		const InnerSelectedKeys: K[] = [];

		v.forEach((item) => {
			const { key, children, haveChildren } = getItemProps(item, fieldKeys);
			const selected = selectedKeysMap.get(key) ?? parentSelected;
			if (!selected) allSelected = false;
			// 存在children，以childrenAllSelected为准【因为可能当前显示selected，但是children有非selected的情况】
			if (haveChildren) {
				const childrenAllSelected = recursionData(children, { level: level + 1, parentSelected: selected });
				if (childrenAllSelected) {
					InnerSelectedKeys.push(key);
				} else {
					allSelected = false;
				}
			}
			// 不存在children，以当前节点selected为准
			if (!haveChildren && selected) {
				InnerSelectedKeys.push(key);
			}
		});
		// 当前兄弟节点未全部选中，或者处在第一层时，将当前节点选中
		if (!allSelected || level === 0) {
			nextSelectedKeys = [...nextSelectedKeys, ...InnerSelectedKeys];
		}
		return allSelected;
	};

	if (data) recursionData(data);

	return nextSelectedKeys;
};
