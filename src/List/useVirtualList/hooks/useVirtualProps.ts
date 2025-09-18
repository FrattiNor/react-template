import { useRef } from 'react';

import type { VirtualListProps } from '../index';

const useVirtualProps = <T>(props: VirtualListProps<T>) => {
	const propsRef = useRef({
		data: props.data,
		gap: props.gap ?? 0,
		direction: props.direction,
		getItemKey: props.getItemKey,
		getItemSize: props.getItemSize,
		overscan: props.overscan ?? [0, 0],
	});
	propsRef.current = {
		data: props.data,
		gap: props.gap ?? 0,
		direction: props.direction,
		getItemKey: props.getItemKey,
		getItemSize: props.getItemSize,
		overscan: props.overscan ?? [0, 0],
	};

	const getProps = <T extends keyof typeof propsRef.current>(key: T) => {
		return propsRef.current[key];
	};

	return getProps;
};

export default useVirtualProps;
