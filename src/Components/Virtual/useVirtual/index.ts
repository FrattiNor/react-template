import useItemSizeObserver from './useItemSizeObserver';
import useObserverContainer from './useObserverContainer';
import useSizeCacheMap from './useSizeCacheMap';
import useVirtualCore from './useVirtualCore';

import type { UseVirtualProps } from './type';

const useVirtual = (props: UseVirtualProps) => {
	// enabled
	const enabled = props.enabled ?? true;
	// horizontal
	const horizontal = props.horizontal ?? false;
	// itemSize缓存
	const sizeCache = useSizeCacheMap({ props });
	// virtual core
	const { totalSize, renderVirtualItems, virtualCore } = useVirtualCore({ props, sizeCache });
	// 监测item动态size
	const { measureItemRef } = useItemSizeObserver({ horizontal, sizeCache });
	// 监测容器
	const { containerRef } = useObserverContainer({ enabled, horizontal, virtualCore });

	return { totalSize, renderVirtualItems, containerRef, measureItemRef };
};

export default useVirtual;
