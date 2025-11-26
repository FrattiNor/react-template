import { useCallback, useEffect, useState } from 'react';

import type { UseVirtualProps } from './type';

type Props = {
	props: UseVirtualProps;
};

const useSizeCacheMap = ({ props }: Props) => {
	const { getItemKey, getItemSize, count } = props;

	// itemSize缓存
	const [sizeCacheMap, setSizeCacheMap] = useState(() => new Map<string, number>());

	// 重写getItemSize，优先使用size缓存
	const getItemSizeCover = useCallback(
		(index: number) => {
			const key = getItemKey(index);
			const cacheSize = sizeCacheMap.get(key);
			if (typeof cacheSize === 'number') return cacheSize;
			return getItemSize(index);
		},
		[getItemKey, getItemSize, sizeCacheMap],
	);

	// 更新itemSize
	const updateItemSize = useCallback(
		({ index, size }: { index: number; size: number; from: string }) => {
			setSizeCacheMap((old) => {
				const key = getItemKey(index);
				if (size !== getItemSize(index) && size !== old.get(key)) {
					old.set(key, size);
					return new Map(old);
				}
				if (size === getItemSize(index) && old.get(key) !== undefined) {
					old.delete(key);
					return new Map(old);
				}
				return old;
			});
		},
		[getItemKey, getItemSize],
	);

	// 当数据源变更时，清除不存在的keyCache
	useEffect(() => {
		const keyObj: Record<string, true> = {};
		for (let i = 0; i < count; i++) {
			const key = getItemKey(i);
			keyObj[key] = true;
		}
		Array.from(sizeCacheMap).forEach(([key]) => {
			if (keyObj[key] !== true) {
				sizeCacheMap.delete(key);
			}
		});
	}, [count, getItemKey]);

	return { getItemSizeCover, updateItemSize };
};

export default useSizeCacheMap;
