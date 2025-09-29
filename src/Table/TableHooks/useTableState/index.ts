import { useCallback, useMemo, useState } from 'react';

import type { ResizeFlag } from '../../TableTypes/type';

const minColWidth = 50;
const maxColWidth = 1500;

// 表格状态
const useTableState = () => {
	// 左右固定的index
	const [pingedLeftFirst, setPingedLeftFirst] = useState<number | undefined>(undefined);
	const [pingedLeftLast, setPingedLeftLast] = useState<number | undefined>(undefined);
	const [pingedRightFirst, setPingedRightFirst] = useState<number | undefined>(undefined);
	const [pingedRightLast, setPingedRightLast] = useState<number | undefined>(undefined);
	// body宽度
	const [bodyClientWidth, setBodyClientWidth] = useState(0);
	// 滚动条宽度
	const [V_ScrollbarWidth, setV_ScrollbarWidth] = useState(0);
	const [H_ScrollbarWidth, setH_ScrollbarWidth] = useState(0);
	// 横向column的size对象
	const [columnSizes, setColumnSizes] = useState<Record<string, number>>({});
	// 行click
	const [rowClickObj, setRowClickObj] = useState<Record<string, boolean>>({});
	// 行hover
	const [rowHoverObj, setRowHoverObj] = useState<Record<string, boolean>>({});
	// 拖拽修改列宽
	const [resizeFlag, setResizeFlag] = useState<ResizeFlag | null>(null);
	// 列宽修改过
	const [resized, setResized] = useState<boolean>(false);
	// 是否需要测量宽度
	const [colMeasure, setColMeasure] = useState<{ measure: boolean; clear: boolean }>({ measure: true, clear: true });
	// 筛选弹窗openKey
	const [filterOpenKey, setFilterOpenKey] = useState<string | undefined>(undefined);

	// 拖拽时的keys
	const resizeKeysObj = useMemo(() => {
		const obj: Record<string, true> = {};
		resizeFlag?.children.forEach(({ index }) => (obj[index] = true));
		return obj;
	}, [resizeFlag]);

	// 获取col的宽度
	const getColumnSize = useCallback((key: string) => columnSizes[key] ?? 0, [columnSizes]);

	// 获取column是否在resized
	const getColResized = useCallback((colIndex: number) => resizeKeysObj[colIndex] === true, [resizeKeysObj]);

	return {
		minColWidth,
		maxColWidth,
		pingedLeftFirst,
		setPingedLeftFirst,
		pingedLeftLast,
		setPingedLeftLast,
		pingedRightFirst,
		setPingedRightFirst,
		pingedRightLast,
		setPingedRightLast,
		V_ScrollbarWidth,
		setV_ScrollbarWidth,
		H_ScrollbarWidth,
		setH_ScrollbarWidth,
		columnSizes,
		getColumnSize,
		setColumnSizes,
		rowClickObj,
		setRowClickObj,
		rowHoverObj,
		setRowHoverObj,
		resized,
		setResized,
		resizeFlag,
		setResizeFlag,
		getColResized,
		colMeasure,
		setColMeasure,
		bodyClientWidth,
		setBodyClientWidth,
		filterOpenKey,
		setFilterOpenKey,
	};
};

export default useTableState;
