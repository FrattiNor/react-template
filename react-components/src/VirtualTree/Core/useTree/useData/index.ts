import { useMemo } from 'react';

import { regExpMatch } from '@react/utils';

import { type HandledDataItem } from '../../type';
import { type WithDefaultVirtualTreeProps } from '../type';
import { getItemProps } from '../utils';

type Props<T, K> = {
	keyword: string;
	props: WithDefaultVirtualTreeProps<T, K>;
	visiblesMap: Map<K, boolean>;
	selectedKeysMap: Map<K, boolean>;
};

const useData = <T, K>({ props, keyword, visiblesMap, selectedKeysMap }: Props<T, K>) => {
	const { data, fieldKeys, checkStrictly } = props;

	// 根据selectedKeys和visiblesByKeyword过滤出来的showData
	const showData = useMemo(() => {
		if (data) {
			// parentOpened 需要自己的是打开状态并且自己的祖先也是打开状态
			type Props = { level: number; parentOpened: boolean; parentSearched: boolean; parentDisabled: boolean; parentSelected: boolean };
			const recursionData = (v: T[], opt?: Props) => {
				const { level = 0, parentOpened = true, parentSearched = false, parentDisabled = false, parentSelected = false } = opt || {};

				// 有一个选中
				let haveOnSelected = false;

				const showData: HandledDataItem<T, K>[] = [];

				v.forEach((item) => {
					const { key, label, children, haveChildren, disabled: _disabled } = getItemProps(item, fieldKeys);
					// item visible
					const visible = visiblesMap.get(key) ?? false;
					// item searched【字符串为空字符串是，不需要匹配】
					const searched = keyword !== '' ? regExpMatch(label, keyword).length > 0 : true;
					// item disabled
					const disabled = (() => {
						if (checkStrictly === true) return _disabled;
						return _disabled || parentDisabled;
					})();
					// item selected
					const selected = (() => {
						const s = selectedKeysMap.get(key) ?? false;
						if (checkStrictly === true) return s;
						return s || parentSelected;
					})();
					// 如果有一个选中
					if (selected === true) haveOnSelected = true;
					// 子级是否全部选中 和 子级是否有一个被搜索到
					const { childHaveOnSelected, childShowData } = (() => {
						// 如果父级是打开的，并且存在children，就继续递归
						if (haveChildren) {
							const { haveOnSelected, showData } = recursionData(children, {
								level: level + 1,
								parentDisabled: disabled,
								parentSelected: selected,
								parentOpened: parentOpened && visible,
								parentSearched: parentSearched || searched,
							});
							return { childHaveOnSelected: haveOnSelected, childShowData: showData };
						} else {
							return { childHaveOnSelected: false, childShowData: [] };
						}
					})();
					// 如果子级有一个没有选中，就不是全部选中
					if (childHaveOnSelected === true) haveOnSelected = true;
					// indeterminate
					const indeterminate = (() => {
						if (checkStrictly === true) return false;
						return selected ? false : childHaveOnSelected;
					})();
					// handledItem
					const handledItem: HandledDataItem<T, K> = {
						key,
						label,
						level,
						visible,
						disabled,
						selected,
						data: item,
						indeterminate,
						isLeaf: !haveChildren,
					};
					// 如果搜索到了，就显示
					if (parentOpened && (parentSearched || searched || childShowData.length > 0)) {
						showData.push(handledItem);
						// 如果有子级，就把子级也显示【子级需要在父级后面插入】
						if (childShowData.length > 0) showData.push(...childShowData);
					}
				});

				return { haveOnSelected, showData: showData };
			};

			return recursionData(data).showData;
		}

		return [];
	}, [data, selectedKeysMap, visiblesMap, JSON.stringify(fieldKeys)]);

	const isEmpty = Array.isArray(showData) ? showData.length === 0 : true;

	return { showData, isEmpty };
};

export default useData;
