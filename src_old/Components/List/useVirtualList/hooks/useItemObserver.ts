import { useEffect, useState } from 'react';

import type useVirtualProps from './useVirtualProps';

type Props<T> = {
	getProps: ReturnType<typeof useVirtualProps<T>>;
	maybeChangeItemSize: (key: string, itemNewSize: number) => void;
};

const useItemObserver = <T>({ getProps, maybeChangeItemSize }: Props<T>) => {
	const [itemObserver] = useState(() => {
		return new ResizeObserver((entries) => {
			entries.forEach((item) => {
				const key = item.target.getAttribute('data-key');
				if (typeof key === 'string') {
					const itemNewSize = getProps('direction') === 'h' ? item.borderBoxSize[0].inlineSize : item.borderBoxSize[0].blockSize;
					maybeChangeItemSize(key, itemNewSize);
				}
			});
		});
	});

	useEffect(() => {
		return () => {
			itemObserver.disconnect();
		};
	}, []);

	return itemObserver;
};

export default useItemObserver;
