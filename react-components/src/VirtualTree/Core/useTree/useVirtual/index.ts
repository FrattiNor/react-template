import { useRef } from 'react';

import { useVirtualizer } from '@react/hooks';

import { type HandledDataItem } from '../../type';
import { type WithDefaultVirtualTreeProps } from '../type';

type Props<T, K> = {
	props: WithDefaultVirtualTreeProps<T, K>;
	showData: HandledDataItem<T, K>[];
};

const useVirtual = <T, K>({ props, showData }: Props<T, K>) => {
	const virtualWrapperRef = useRef<HTMLDivElement>(null);
	const { paddingBottom, paddingTop, lineHeight } = props;

	// 竖向虚拟
	const virtualizer = useVirtualizer({
		overscan: 0,
		paddingStart: paddingTop ?? 0,
		paddingEnd: paddingBottom ?? 0,
		count: showData?.length ?? 0,
		estimateSize: () => lineHeight,
		getScrollElement: () => virtualWrapperRef.current,
	});

	const virtualItems = virtualizer.getVirtualItems(); // 纵向虚拟显示item
	const totalSize = virtualizer.getTotalSize(); // 纵向总高度
	const distance = virtualItems[0]?.start ?? 0; // 纵向offset距离
	const measureElement = virtualizer.measureElement; // 纵向监测元素高度

	return {
		lineHeight,
		virtualWrapperRef,
		virtual: {
			distance,
			totalSize,
			virtualItems,
			measureElement,
		},
	};
};

export default useVirtual;
