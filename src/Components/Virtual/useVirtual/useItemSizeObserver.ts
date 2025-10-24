import { type Dispatch, type SetStateAction, useRef, useEffect } from 'react';

type Props = {
	horizontal: boolean;
	setSizeCacheMap: Dispatch<SetStateAction<Map<string, number>>>;
};

const useItemSizeObserver = ({ setSizeCacheMap, horizontal }: Props) => {
	const itemSizeObserverRef = useRef<ResizeObserver | null>(null);

	const getItemSizeObserver = () => {
		if (itemSizeObserverRef.current === null) {
			itemSizeObserverRef.current = new ResizeObserver((entries) => {
				entries.forEach((item) => {
					const key = item.target.getAttribute('data-key');
					if (typeof key === 'string' && key !== '') {
						setSizeCacheMap((old) => {
							const nodeSize = item.contentRect[horizontal ? 'width' : 'height'];
							if (old.get(key) !== nodeSize) {
								old.set(key, nodeSize);
								return new Map(old);
							}
							return old;
						});
					}
				});
			});
		}
		return itemSizeObserverRef.current;
	};

	// 清除itemSize Observer
	useEffect(() => {
		return () => {
			if (itemSizeObserverRef.current) itemSizeObserverRef.current.disconnect();
		};
	}, []);

	return { getItemSizeObserver };
};

export default useItemSizeObserver;
