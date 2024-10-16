import { useMemo } from 'react';

import { useMergeState } from '@react/hooks';

import { getAllParentKeys } from './utils';
import { getItemProps } from '../utils';
import { useVisiblesChange } from './useVisiblesChange';
import { type WithDefaultVirtualTreeProps } from '../type';

type Props<T, K> = {
	keyword: string;
	props: WithDefaultVirtualTreeProps<T, K>;
};

const useVisibles = <T, K>({ props, keyword }: Props<T, K>) => {
	const { data, fieldKeys, defaultVisibleLevel, defaultVisibles } = props;

	// 合并 visibles state
	const [visibles, setVisibles] = useMergeState<K[]>({
		defaultValue: [],
		state: props.visibles,
		setState: props.setVisibles,
	});

	// 将visibles转换为map
	const visiblesMap = useMemo(() => {
		const map = new Map<K, boolean>();
		visibles.forEach((key) => {
			map.set(key, true);
		});
		return map;
	}, [visibles]);

	// 是否至少有一个打开
	const atLeastOneOpen = Object.keys(visibles).length > 0;

	// 关闭所有
	const closeAll = () => {
		setVisibles([]);
	};

	// 打开所有
	const openAll = () => {
		if (data) {
			const allParentKeys = getAllParentKeys({ data, fieldKeys });
			setVisibles(allParentKeys);
		}
	};

	// 根据item修改打开状态
	const triggerVisibleByItem = (item: T) => {
		const { key } = getItemProps(item, fieldKeys);
		const newVisiblesMap = new Map(visiblesMap);
		const visible = visiblesMap.get(key) ?? false;
		if (visible) {
			newVisiblesMap.delete(key);
		} else {
			newVisiblesMap.set(key, true);
		}
		setVisibles(Array.from(newVisiblesMap.keys()));
	};

	// visibles 变更hook
	// data变更删除不存在的key
	// keyword变更修改key
	// 默认展开逻辑
	useVisiblesChange<T, K>({
		data,
		keyword,
		fieldKeys,
		defaultVisibleLevel,
		defaultVisibles,
		visibles,
		setVisibles,
	});

	return { visiblesMap, triggerVisibleByItem, closeAll, openAll, atLeastOneOpen };
};

export default useVisibles;
