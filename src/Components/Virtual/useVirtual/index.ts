import useItemSizeObserver from './useItemSizeObserver';
import useObserverContainer from './useObserverContainer';
import useVirtualCore from './useVirtualCore';
import type { UseVirtualProps } from './type';
import useSizeCacheMap from './useSizeCacheMap';

const useVirtual = (props: UseVirtualProps) => {
	// enabled
	const enabled = props.enabled ?? true;
	// horizontal
	const horizontal = props.horizontal ?? false;
	// itemSize缓存
	const sizeCache = useSizeCacheMap({ props });
	// virtual core
	const { totalSize, virtualItems, virtualCore } = useVirtualCore({ props, sizeCache });
	// 监测item动态size
	const { measureItemRef } = useItemSizeObserver({ horizontal, sizeCache });
	// 监测容器
	const { containerRef } = useObserverContainer({ enabled, horizontal, virtualCore });

	return { totalSize, virtualItems, containerRef, measureItemRef };
};

export default useVirtual;
