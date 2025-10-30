import { useState } from 'react';

const useTableState = () => {
	const [v_ScrollbarWidth, setV_ScrollbarWidth] = useState(0);
	const [sizeCache, setSizeCache] = useState<Map<string, number>>(() => new Map());

	return { sizeCache, setSizeCache, v_ScrollbarWidth, setV_ScrollbarWidth };
};

export default useTableState;
