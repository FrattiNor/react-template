import { useMemo, useState } from 'react';

import { useSelectChange } from './useSelectChange';
import { getNotCheckStrictlySelected, getSelectedKeysMap, getSelectedItems } from './utils';
import { type WithDefaultVirtualTreeProps } from '../type';

const useSelect = <T, K>(props: WithDefaultVirtualTreeProps<T, K>) => {
	const {
		data,
		selectMode,
		selectedKeys: outSelectedKeys,
		setSelectedKeys: setOutSelectedKeys,
		checkStrictly,
		shouldSelectedKeysChange,
		fieldKeys,
	} = props;

	// 内部的 selectedKeys state
	const [innerSelectedKeys, setInnerSelectedKeys] = useState<K[]>([]);

	// 根据选中类型，获取选中的keys
	const selectedKeys = outSelectedKeys ?? innerSelectedKeys;

	// 选中的keys map
	const selectedKeysMap = useMemo(() => getSelectedKeysMap(selectedKeys), [selectedKeys]);

	// 根据选中类型，设置选中的keys
	const setSelectedKeys = (nextSelectedKeys: K[]) => {
		let couldChange = true;
		const selectedItems = getSelectedItems({ data, fieldKeys, selectedKeysMap: getSelectedKeysMap(nextSelectedKeys) });

		if (typeof shouldSelectedKeysChange === 'function') {
			couldChange = shouldSelectedKeysChange(nextSelectedKeys, { selectedItems });
		}

		if (couldChange === true) {
			if (typeof setOutSelectedKeys === 'function') {
				setOutSelectedKeys(nextSelectedKeys, { selectedItems });
			} else {
				setInnerSelectedKeys(nextSelectedKeys);
			}
		}
	};

	// 根据item修改选中状态
	const changeSelected = (key: K, nextSelected: boolean) => {
		switch (selectMode) {
			case 'none':
				break;
			case 'single':
				setSelectedKeys(nextSelected === true ? [key] : []);
				break;
			case 'multiple': {
				// 完全受控
				if (checkStrictly === true) {
					const nextSelectedKeysMap = new Map(selectedKeysMap);
					if (nextSelected === false) {
						nextSelectedKeysMap.delete(key);
					} else {
						nextSelectedKeysMap.set(key, true);
					}
					setSelectedKeys(Array.from(nextSelectedKeysMap.keys()));
				} else {
					const nextSelectedKeysMap = new Map(selectedKeysMap);
					nextSelectedKeysMap.set(key, nextSelected);
					setSelectedKeys(getNotCheckStrictlySelected({ data, fieldKeys, selectedKeysMap: nextSelectedKeysMap }));
				}
				break;
			}
		}
	};

	// data变更时，清理不存在的selectedKeys
	useSelectChange({ data, fieldKeys, selectedKeys, setSelectedKeys });

	return { selectedKeysMap, changeSelected };
};

export default useSelect;
