import { useMemo, useState } from 'react';
import type { ResizeFlag2 } from '../type';

const minColWidth = 50;
const maxColWidth = 1500;

// 表格状态
const useTableState = () => {
	// 左右固定的index
	const [leftPingedIndex, setLeftPingedIndex] = useState<undefined | number>(undefined);
	const [rightPingedIndex, setRightPingedIndex] = useState<undefined | number>(undefined);
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
	const [resizeFlag, setResizeFlag] = useState<ResizeFlag2 | null>(null);
	// 列宽修改过
	const [resized, setResized] = useState<boolean>(false);
	// 是否需要测量
	const [needMeasure, setNeedMeasure] = useState(false);

	// 拖拽时的keys
	const resizeKeysObj = useMemo(() => {
		const obj: Record<string, true> = {};
		resizeFlag?.children.forEach(({ key }) => (obj[key] = true));
		return obj;
	}, [resizeFlag]);

	// 获取col的宽度
	const getColumnSize = (key: string) => {
		return columnSizes[key] ?? 0;
	};

	// 获取column是否在resized
	const getColResized = (colKey: string) => {
		return resizeKeysObj[colKey] === true;
	};

	return {
		minColWidth,
		maxColWidth,
		leftPingedIndex,
		setLeftPingedIndex,
		rightPingedIndex,
		setRightPingedIndex,
		H_ScrollbarWidth,
		setH_ScrollbarWidth,
		V_ScrollbarWidth,
		setV_ScrollbarWidth,
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
		needMeasure,
		setNeedMeasure,
		bodyClientWidth,
		setBodyClientWidth,
	};
};

export default useTableState;
