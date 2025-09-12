import { useState } from 'react';

type ResizeFlag = {
	key: string;
	pageX: number;
	clientWidth: number;
};

// 表格状态
const useTableState = () => {
	// 左右固定的index
	const [leftPingedIndex, setLeftPingedIndex] = useState<undefined | number>(undefined);
	const [rightPingedIndex, setRightPingedIndex] = useState<undefined | number>(undefined);
	// 纵向滚动条宽度
	const [rightScrollBarWidth, setRightScrollBarWidth] = useState(0);
	// 横向column的size对象
	const [columnSizes, setColumnSizes] = useState<Record<string, number>>({});
	// 行click
	const [rowClickObj, setRowClickObj] = useState<Record<string, boolean>>({});
	// 行hover
	const [rowHoverObj, setRowHoverObj] = useState<Record<string, boolean>>({});
	// 拖拽修改列宽
	const [resizeFlag, setResizeFlag] = useState<ResizeFlag | null>(null);

	//
	const getColumnSize = (key: string) => {
		return columnSizes[key] ?? 0;
	};

	return {
		leftPingedIndex,
		setLeftPingedIndex,
		rightPingedIndex,
		setRightPingedIndex,
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
	};
};

export default useTableState;
