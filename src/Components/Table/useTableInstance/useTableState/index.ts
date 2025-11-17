import { useMemo, useState } from 'react';

const useTableState = () => {
	const [v_scrollbar, setV_scrollbar] = useState({ have: false, outSize: 0, innerSize: 0, width: 0 });
	const [h_scrollbar, setH_scrollbar] = useState({ have: false, outSize: 0, innerSize: 0, width: 0 });
	const [sizeCacheMap, setSizeCacheMap] = useState<Map<string, number>>(() => new Map());

	// 左右固定的index
	const [pingedObj, setPingedObj] = useState<{ left: Record<string, true>; right: Record<string, true> }>({ left: {}, right: {} });

	const { pingedLeftStart, pingedLeftEnd } = useMemo(() => {
		let pingedLeftStart: number | undefined = undefined;
		let pingedLeftEnd: number | undefined = undefined;
		Object.keys(pingedObj.left).forEach((_index) => {
			const index = parseInt(_index);
			if (pingedLeftStart === undefined || index < pingedLeftStart) pingedLeftStart = index;
			if (pingedLeftEnd === undefined || index > pingedLeftEnd) pingedLeftEnd = index;
		});
		return { pingedLeftStart, pingedLeftEnd };
	}, [pingedObj.left]);

	const { pingedRightStart } = useMemo(() => {
		let pingedRightStart: number | undefined = undefined;
		let pingedRightEnd: number | undefined = undefined;
		Object.keys(pingedObj.right).forEach((_index) => {
			const index = parseInt(_index);
			if (pingedRightStart === undefined || index < pingedRightStart) pingedRightStart = index;
			if (pingedRightEnd === undefined || index > pingedRightEnd) pingedRightEnd = index;
		});
		return { pingedRightStart, pingedRightEnd };
	}, [pingedObj.right]);

	return {
		sizeCacheMap,
		setSizeCacheMap,
		v_scrollbar,
		setV_scrollbar,
		h_scrollbar,
		setH_scrollbar,
		pingedLeftStart,
		pingedLeftEnd,
		pingedRightStart,
		setPingedObj,
	};
};

export default useTableState;
