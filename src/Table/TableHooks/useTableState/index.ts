import { useMemo, useState } from 'react';
import type { ResizeFlag2 } from '../type';

const minColWidth = 50;
const maxColWidth = 1500;

// 表格状态
const useTableState = () => {
	// 左右固定的index
	const [leftPingedIndex, setLeftPingedIndex] = useState<undefined | number>(undefined);
	const [rightPingedIndex, setRightPingedIndex] = useState<undefined | number>(undefined);
	// 纵向滚动条宽度
	const [rightScrollBarWidth, setRightScrollBarWidth] = useState(0);
	const [bottomScrollBarWidth, setBottomScrollBarWidth] = useState(0);
	// 横向column的size对象
	const [columnSizes, setColumnSizes] = useState<Record<string, number>>({});
	// 行click
	const [rowClickObj, setRowClickObj] = useState<Record<string, boolean>>({});
	// 行hover
	const [rowHoverObj, setRowHoverObj] = useState<Record<string, boolean>>({});
	// 拖拽修改列宽
	const [resizeFlag, setResizeFlag] = useState<ResizeFlag2 | null>(null);
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
	// 获取是否在resized
	const getIsResized = (colKey: string) => {
		return resizeKeysObj[colKey] === true;
	};

	return {
		minColWidth,
		maxColWidth,
		leftPingedIndex,
		setLeftPingedIndex,
		rightPingedIndex,
		setRightPingedIndex,
		bottomScrollBarWidth,
		setBottomScrollBarWidth,
		rightScrollBarWidth,
		setRightScrollBarWidth,
		columnSizes,
		getColumnSize,
		setColumnSizes,
		rowClickObj,
		setRowClickObj,
		rowHoverObj,
		setRowHoverObj,
		resizeFlag,
		setResizeFlag,
		getIsResized,
	};
};

export default useTableState;
