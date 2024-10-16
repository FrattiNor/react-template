import { useMemo } from 'react';

import { regExpMatch } from '@react/utils';

import { type HandledDataItem } from '../../type';
import { type WithDefaultVirtualListProps } from '../type';
import { getItemProps } from '../utils';

type Props<T, K> = {
	keyword: string;
	props: WithDefaultVirtualListProps<T, K>;
	selectedKeysMap: Map<K, boolean>;
};

const useData = <T, K>({ props, keyword, selectedKeysMap }: Props<T, K>) => {
	const { data, fieldKeys } = props;

	// 根据selectedKeys和visiblesByKeyword过滤出来的showData
	const showData = useMemo(() => {
		if (data) {
			const showData: HandledDataItem<T, K>[] = [];

			data.forEach((item) => {
				const { key, label, disabled } = getItemProps(item, fieldKeys);
				// item searched【字符串为空字符串是，不需要匹配】
				const searched = keyword !== '' ? regExpMatch(label, keyword).length > 0 : true;
				// item selected
				const selected = selectedKeysMap.get(key) ?? false;
				// handledItem
				const handledItem: HandledDataItem<T, K> = {
					key,
					label,
					disabled,
					selected,
					data: item,
				};
				// 如果搜索到了，就显示
				if (searched) showData.push(handledItem);
			});

			return showData;
		}

		return [];
	}, [data, selectedKeysMap, keyword, JSON.stringify(fieldKeys)]);

	const isEmpty = Array.isArray(showData) ? showData.length === 0 : true;

	return { showData, isEmpty };
};

export default useData;
