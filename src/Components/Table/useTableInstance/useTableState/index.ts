import { useMemo, useState } from 'react';

import { type TableScrollbarState } from '../../TableTypes/type';

const useTableState = () => {
	const [sizeCacheMap, setSizeCacheMap] = useState<Map<string, number>>(() => new Map());
	const [v_scrollbar, setV_scrollbar] = useState<TableScrollbarState>({ have: false, outSize: 0, innerSize: 0, width: 0 });
	const [h_scrollbar, setH_scrollbar] = useState<TableScrollbarState>({ have: false, outSize: 0, innerSize: 0, width: 0 });

	// 左右固定的index
	const [pingedObj, setPingedObj] = useState<{ [key: string]: { fixed: 'left' | 'right'; index: number } }>({});

	const { pingedLeftStart, pingedLeftEnd, pingedRightStart } = useMemo(() => {
		let pingedLeftStart: number | undefined = undefined;
		let pingedLeftEnd: number | undefined = undefined;
		let pingedRightStart: number | undefined = undefined;
		let pingedRightEnd: number | undefined = undefined;
		Object.values(pingedObj).forEach(({ index, fixed }) => {
			if (fixed === 'left') {
				if (pingedLeftStart === undefined || index < pingedLeftStart) pingedLeftStart = index;
				if (pingedLeftEnd === undefined || index > pingedLeftEnd) pingedLeftEnd = index;
			}
			if (fixed === 'right') {
				if (pingedRightStart === undefined || index < pingedRightStart) pingedRightStart = index;
				if (pingedRightEnd === undefined || index > pingedRightEnd) pingedRightEnd = index;
			}
		});
		return { pingedLeftStart, pingedLeftEnd, pingedRightStart, pingedRightEnd };
	}, [pingedObj]);

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
