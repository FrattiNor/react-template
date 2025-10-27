import { useEffect, useMemo, useState } from 'react';
import VirtualCore from '../Core';
import { flushSync } from 'react-dom';
import type { UseVirtualProps } from './type';
import type useSizeCacheMap from './useSizeCacheMap';

type Props = {
	props: UseVirtualProps;
	sizeCache: ReturnType<typeof useSizeCacheMap>;
};

const useVirtual = ({ props, sizeCache }: Props) => {
	const { getItemSizeCover } = sizeCache;
	const { enabled, count, overscan, gap, getItemKey } = props;
	const [virtualCore, setVirtualCore] = useState(() => new VirtualCore());

	// 更新参数，并触state变更
	useEffect(() => {
		virtualCore.updateProps({
			gap,
			count,
			enabled,
			overscan,
			getItemKey,
			getItemSize: getItemSizeCover,
			onTotalSizeChange: () => setVirtualCore(new VirtualCore(virtualCore)),
			onRangeChange: ({ isScroll }) => {
				if (isScroll) {
					flushSync(() => setVirtualCore(new VirtualCore(virtualCore)));
				} else {
					setVirtualCore(new VirtualCore(virtualCore));
				}
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enabled, count, overscan, gap, getItemKey, getItemSizeCover]);

	// 获取需要使用的state
	const { totalSize, virtualItems } = useMemo(() => {
		const totalSize = virtualCore.state.totalSize;
		const virtualItems = (() => {
			const items: Array<{ key: string; index: number; start: number; end: number; size: number }> = [];
			if (
				typeof virtualCore.state.rangeStart === 'number' &&
				typeof virtualCore.state.rangeEnd === 'number' &&
				Array.isArray(virtualCore.state.sizeList) &&
				virtualCore.state.sizeList.length > 0
			) {
				for (let i = virtualCore.state.rangeStart; i <= virtualCore.state.rangeEnd; i++) {
					const item = virtualCore.state.sizeList[i];
					items.push(item);
				}
			}
			return items;
		})();
		return { totalSize, virtualItems };
	}, [virtualCore]);

	return { totalSize, virtualItems, virtualCore };
};

export default useVirtual;
