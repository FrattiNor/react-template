import { useState } from 'react';

const useTableState = () => {
	const [v_ScrollbarWidth, setV_ScrollbarWidth] = useState(0);
	const [h_ScrollbarWidth, setH_ScrollbarWidth] = useState(0);
	const [sizeCacheMap, setSizeCacheMap] = useState<Map<string, number>>(() => new Map());

	// 左右固定的index
	const [pingedLeftEnd, setPingedLeftEnd] = useState<number | undefined>(undefined);
	const [pingedRightEnd, setPingedRightEnd] = useState<number | undefined>(undefined);

	return {
		sizeCacheMap,
		setSizeCacheMap,
		v_ScrollbarWidth,
		setV_ScrollbarWidth,
		h_ScrollbarWidth,
		setH_ScrollbarWidth,
		pingedLeftEnd,
		setPingedLeftEnd,
		pingedRightEnd,
		setPingedRightEnd,
	};
};

export default useTableState;
