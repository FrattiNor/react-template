import { useEffect, useRef } from 'react';

import { type VirtualListFieldKeys } from '../../type';
import { getItemProps } from '../utils';

type GetAllKeysMapProps<T, K> = {
	data: T[];
	fieldKeys: VirtualListFieldKeys<T, K>;
};

const getAllKeysMap = <T, K>({ data, fieldKeys }: GetAllKeysMapProps<T, K>) => {
	// 搜索到的Id
	const allKeysMap = new Map<K, boolean>();
	// 遍历数据
	data?.forEach((item) => {
		const { key } = getItemProps(item, fieldKeys);
		allKeysMap.set(key, true);
	});

	return allKeysMap;
};

type SelectChangeProps<T, K> = {
	data?: T[];
	fieldKeys: VirtualListFieldKeys<T, K>;
	selectedKeys: K[];
	setSelectedKeys: (selectedKeys: K[]) => void;
};

export const useSelectChange = <T, K>(props: SelectChangeProps<T, K>) => {
	const { data, fieldKeys, selectedKeys, setSelectedKeys } = props;

	// data变更时，清理不存在的selectedKeys
	const isFirstRef = useRef(true);
	useEffect(() => {
		if (data) {
			if (isFirstRef.current) {
				isFirstRef.current = false;
				return;
			} else {
				const nextSelectedKeys: K[] = [];
				const allKeysMap = getAllKeysMap({ data, fieldKeys });
				selectedKeys.forEach((key) => {
					if (allKeysMap.get(key)) {
						nextSelectedKeys.push(key);
					}
				});
				setSelectedKeys(nextSelectedKeys);
			}
		}
	}, [data]);
};
