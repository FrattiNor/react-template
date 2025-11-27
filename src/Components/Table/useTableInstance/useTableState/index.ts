import { useMemo, useState } from 'react';

import { type ResizeFlag, type TableScrollbarState } from '../../TableTypes/type';

const useTableState = () => {
	// 列宽state
	const [sizeCacheMap, setSizeCacheMap] = useState<Map<string, number>>(() => new Map());
	// 纵向滚动条
	const [v_scrollbar, setV_scrollbar] = useState<TableScrollbarState>({ have: false, wrapperSize: 0, innerSize: 0, width: 0 });
	// 横向滚动条
	const [h_scrollbar, setH_scrollbar] = useState<TableScrollbarState>({ have: false, wrapperSize: 0, innerSize: 0, width: 0 });
	// 列宽是否被修改过
	const [resized, setResized] = useState<boolean>(false);
	// 拖拽修改列宽标记
	const [resizeFlag, setResizeFlag] = useState<ResizeFlag | null>(null);
	// 左右固定的index
	const [pingedObj, setPingedObj] = useState<{ [key: string]: { fixed: 'left' | 'right'; index: number } }>({});
	// 根据pingedObj计算相关数据
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
		resized,
		setResized,
		resizeFlag,
		setResizeFlag,
	};
};

export default useTableState;
