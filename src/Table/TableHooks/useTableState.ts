import { useRef, useState } from 'react';

// 表格状态
const useTableState = () => {
	// 左右固定移动距离
	const pinged = useRef({ left: 0, right: 0 });
	// 纵向滚动条宽度
	const [rightScrollBarWidth, setRightScrollBarWidth] = useState(0);
	// 横向column的size对象
	const [columnSizes, setColumnSizes] = useState<Record<string, number>>({});

	return {
		pinged,
		rightScrollBarWidth,
		setRightScrollBarWidth,
		columnSizes,
		setColumnSizes,
	};
};

export default useTableState;
