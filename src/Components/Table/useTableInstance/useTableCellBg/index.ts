import { useCallback, useMemo } from 'react';

import type useTableState from '../useTableState';

type Props = {
	tableState: ReturnType<typeof useTableState>;
};

// 表格 单元格 背景色
// 根据点击、hover、resize决定
const useTableCellBg = ({ tableState }: Props) => {
	const { resizeFlag } = tableState;

	// 拖拽时的keys
	const resizeKeysObj = useMemo(() => {
		const obj: Record<string, true> = {};
		resizeFlag?.children.forEach(({ index }) => (obj[index] = true));
		return obj;
	}, [resizeFlag]);

	// 获取body cell 背景色
	// 根据resize、hover、select、click决定，存在3档颜色
	const getBodyCellBg = useCallback(
		({ colIndexStart, colIndexEnd, defaultBgLevel }: { colIndexStart: number; colIndexEnd: number; defaultBgLevel?: number }) => {
			let bgColorLevel = defaultBgLevel ?? 0;
			if (resizeKeysObj[colIndexStart] === true || resizeKeysObj[colIndexEnd] === true) bgColorLevel++;
			// if (rowClick === true && getClicked({ rowKeys }) === true) bgColorLevel++;
			// if (rowHover === true && getHovered({ rowKeys }) === true) bgColorLevel++;
			// if (rowSelect === true && getSelected({ rowKeys }) === true) bgColorLevel++;
			if (bgColorLevel === 0) return 'var(--table-body-cell-bg)';
			if (bgColorLevel === 1) return 'var(--table-body-cell-active-bg-L1)';
			if (bgColorLevel === 2) return 'var(--table-body-cell-active-bg-L2)';
			if (bgColorLevel >= 3) return 'var(--table-body-cell-active-bg-L3)';
			return 'var(--table-body-cell-bg)';
		},
		[resizeKeysObj],
	);

	// 获取head cell 背景色
	// 根据resize决定，存在1档颜色
	const getHeadCellBg = useCallback(
		({ colIndexStart, colIndexEnd }: { colIndexStart: number; colIndexEnd: number }) => {
			let bgColorLevel = 0;
			if (resizeKeysObj[colIndexStart] === true && resizeKeysObj[colIndexEnd] === true) bgColorLevel++;
			if (bgColorLevel === 0) return 'var(--table-head-cell-bg)';
			if (bgColorLevel >= 1) return 'var(--table-head-cell-active-bg)';
			return 'var(--table-head-cell-bg)';
		},
		[resizeKeysObj],
	);

	return { getBodyCellBg, getHeadCellBg };
};

export default useTableCellBg;
