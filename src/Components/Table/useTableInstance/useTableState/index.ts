import { useState } from 'react';

const useTableState = () => {
	const [v_ScrollbarWidth, setV_ScrollbarWidth] = useState(0);
	const [h_ScrollbarWidth, setH_ScrollbarWidth] = useState(0);
	const [sizeCache, setSizeCache] = useState<Map<string, number>>(() => new Map());

	// 左右固定的index
	const [pingedLeftStart, setPingedLeftStart] = useState<number | undefined>(undefined);
	const [pingedLeftEnd, setPingedLeftEnd] = useState<number | undefined>(undefined);
	const [pingedRightStart, setPingedRightStart] = useState<number | undefined>(undefined);
	const [pingedRightEnd, setPingedRightEnd] = useState<number | undefined>(undefined);

	return {
		sizeCache,
		setSizeCache,
		v_ScrollbarWidth,
		setV_ScrollbarWidth,
		h_ScrollbarWidth,
		setH_ScrollbarWidth,
		pingedLeftStart,
		setPingedLeftStart,
		pingedLeftEnd,
		setPingedLeftEnd,
		pingedRightStart,
		setPingedRightStart,
		pingedRightEnd,
		setPingedRightEnd,
	};
};

export default useTableState;
