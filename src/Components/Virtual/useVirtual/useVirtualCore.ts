/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { VirtualProps } from '../Core/type';
import VirtualCore from '../Core';
import { flushSync } from 'react-dom';

type Props = {
	sizeCacheMap: Map<string, number>;
	props: Omit<VirtualProps, 'onRangeChange' | 'onTotalSizeChange'>;
};

const useVirtual = ({ props, sizeCacheMap }: Props) => {
	// core
	const [virtualCore, setVirtualCore] = useState(() => new VirtualCore());

	// 重写getItemSize，优先使用size缓存
	const getItemSize = useCallback(
		(index: number) => {
			const key = props.getItemKey(index);
			const cacheSize = sizeCacheMap.get(key);
			if (typeof cacheSize === 'number') return cacheSize;
			return props.getItemSize(index);
		},
		[props.getItemKey, props.getItemSize, sizeCacheMap],
	);

	// 更新参数，并触state变更
	useEffect(() => {
		virtualCore.updateProps({
			...props,
			getItemSize,
			onTotalSizeChange: () => {
				setVirtualCore(new VirtualCore(virtualCore));
			},
			onRangeChange: ({ isScroll }) => {
				if (isScroll) {
					flushSync(() => setVirtualCore(new VirtualCore(virtualCore)));
				} else {
					setVirtualCore(new VirtualCore(virtualCore));
				}
			},
		});
	}, [props, getItemSize]);

	// 获取需要使用的state
	const { totalSize, virtualItems } = useMemo(() => {
		const totalSize = virtualCore.state.totalSize;
		const virtualItems = virtualCore.getVirtualItems();
		return { totalSize, virtualItems };
	}, [virtualCore]);

	return { totalSize, virtualItems, virtualCore };
};

export default useVirtual;
