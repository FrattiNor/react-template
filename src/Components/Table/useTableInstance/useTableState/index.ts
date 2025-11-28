import { useState } from 'react';

import { type TableColumnFixed, type ResizeFlag, type TableScrollbarState } from '../../TableTypes/type';

const useTableState = () => {
	// body宽度
	const [bodyWidth, setBodyWidth] = useState<number>(() => 0);
	// 列宽是否被修改过
	const [resized, setResized] = useState<boolean>(() => false);
	// 拖拽修改列宽标记
	const [resizeFlag, setResizeFlag] = useState<ResizeFlag | null>(() => null);
	// 行click { [key]: true }
	const [rowClickedMap, setRowClickedMap] = useState<Map<string, true>>(() => new Map());
	// 行hover { [key]: true }
	const [rowHoveredMap, setRowHoveredMap] = useState<Map<string, true>>(() => new Map());
	// 列宽state  { [key]: number }
	const [sizeCacheMap, setSizeCacheMap] = useState<Map<string, number>>(() => new Map());
	// 纵向滚动条
	const [v_scrollbar, setV_scrollbar] = useState<TableScrollbarState>(() => ({ have: false, innerSize: 0, width: 0 }));
	// 横向滚动条
	const [h_scrollbar, setH_scrollbar] = useState<TableScrollbarState>(() => ({ have: false, innerSize: 0, width: 0 }));
	// 左右固定的index { [key]: { fixed: TableColumnFixed; index: number } }
	const [pingedMap, setPingedMap] = useState<Map<string, { fixed: TableColumnFixed; index: number }>>(() => new Map());

	return {
		bodyWidth,
		setBodyWidth,
		sizeCacheMap,
		setSizeCacheMap,
		v_scrollbar,
		setV_scrollbar,
		h_scrollbar,
		setH_scrollbar,
		pingedMap,
		setPingedMap,
		resized,
		setResized,
		resizeFlag,
		setResizeFlag,
		rowClickedMap,
		setRowClickedMap,
		rowHoveredMap,
		setRowHoveredMap,
	};
};

export default useTableState;
