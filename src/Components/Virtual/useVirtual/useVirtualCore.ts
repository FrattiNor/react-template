import { useMemo, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';

import VirtualCore from '../Core';

import type { UseVirtualProps } from './type';
import type useSizeCacheMap from './useSizeCacheMap';
import type { VirtualSizeListItem } from '../Core/type';

type Props = {
	props: UseVirtualProps;
	sizeCache: ReturnType<typeof useSizeCacheMap>;
};

const useVirtual = ({ props, sizeCache }: Props) => {
	const { getItemSizeCover } = sizeCache;
	const { syncUpdate, enabled, count, overscan, gap, getItemKey } = props;
	const [virtualCore, setVirtualCore] = useState(() => new VirtualCore());

	// 获取需要使用的state
	const { renderVirtualItems, totalSize } = useMemo(() => {
		// 更新virtualCore参数
		virtualCore.updateProps({
			gap,
			count,
			enabled,
			overscan,
			getItemKey,
			getItemSize: getItemSizeCover,
			onTotalSizeChange: () => {
				setVirtualCore(new VirtualCore(virtualCore));
			},
			onRangeChange: ({ isScroll }) => {
				if (isScroll) {
					if ((syncUpdate ?? true) === true) {
						flushSync(() => setVirtualCore(new VirtualCore(virtualCore)));
					} else {
						setVirtualCore(new VirtualCore(virtualCore));
					}
				} else {
					setVirtualCore(new VirtualCore(virtualCore));
				}
			},
		});

		// 渲染virtualItems
		const renderVirtualItems = (render: (sizeListItem: VirtualSizeListItem) => ReactNode) => {
			const renderData: ReactNode[] = [];
			if (
				typeof virtualCore.state.rangeStart === 'number' &&
				typeof virtualCore.state.rangeEnd === 'number' &&
				Array.isArray(virtualCore.state.sizeList) &&
				virtualCore.state.sizeList.length > 0
			) {
				for (let i = virtualCore.state.rangeStart; i <= virtualCore.state.rangeEnd; i++) {
					const item = virtualCore.state.sizeList[i];
					renderData.push(render(item));
				}
			}
			return renderData;
		};

		// totalSize
		const totalSize = virtualCore.state.totalSize;

		return { renderVirtualItems, totalSize };
	}, [virtualCore, syncUpdate, enabled, count, overscan, gap, getItemKey, getItemSizeCover]);

	return { renderVirtualItems, totalSize, virtualCore };
};

export default useVirtual;
