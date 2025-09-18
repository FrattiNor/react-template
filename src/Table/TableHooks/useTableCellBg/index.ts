import { startTransition, useCallback } from 'react';

import type useTableState from '../useTableState';

type Props = {
	tableState: ReturnType<typeof useTableState>;
};

// 表格 单元格 背景色
const useTableCellBg = ({ tableState }: Props) => {
	const { rowClickObj, rowHoverObj, setRowHoverObj, setRowClickObj, getColResized } = tableState;

	const getClicked = useCallback(
		({ rowKeys }: { rowKeys: string[] }) => {
			return rowKeys.some((key) => rowClickObj[key] === true);
		},
		[rowClickObj],
	);

	const getHovered = useCallback(
		({ rowKeys }: { rowKeys: string[] }) => {
			return rowKeys.some((key) => rowHoverObj[key] === true);
		},
		[rowHoverObj],
	);

	const getBodyCellBg = useCallback(
		({ rowKeys, colIndexs }: { rowKeys: string[]; colIndexs: [number] | [number, number] }) => {
			let bgColorLevel = 0;
			const start = colIndexs[0];
			const end = colIndexs[colIndexs.length - 1];
			if (getColResized(start) || getColResized(end)) bgColorLevel++;
			if (getClicked({ rowKeys }) === true) bgColorLevel++;
			if (getHovered({ rowKeys }) === true) bgColorLevel++;
			if (bgColorLevel === 0) return 'var(--table-body-cell-bg)';
			if (bgColorLevel === 1) return 'var(--table-body-cell-active-bg-L1)';
			if (bgColorLevel >= 2) return 'var(--table-body-cell-active-bg-L2)';
			return 'var(--table-body-cell-bg)';
		},
		[getColResized, getClicked, getHovered],
	);

	const getHeadCellBg = useCallback(
		({ colIndexs }: { colIndexs: [number] | [number, number] }) => {
			let bgColorLevel = 0;
			const start = colIndexs[0];
			const end = colIndexs[colIndexs.length - 1];
			if (getColResized(start) && getColResized(end)) bgColorLevel++;
			if (bgColorLevel === 0) return 'var(--table-head-cell-bg)';
			if (bgColorLevel >= 1) return 'var(--table-head-cell-active-bg)';
			return 'var(--table-head-cell-bg)';
		},
		[getColResized],
	);

	const bodyRowMouseEnter = useCallback(({ rowKeys }: { rowKeys: string[] }) => {
		startTransition(() => {
			const next: Record<string, boolean> = {};
			rowKeys.forEach((key) => (next[key] = true));
			setRowHoverObj(next);
		});
	}, []);

	const bodyRowMouseLeave = useCallback(({ rowKeys }: { rowKeys: string[] }) => {
		startTransition(() => {
			setRowHoverObj((old) => {
				const next = { ...old };
				rowKeys.forEach((key) => delete next[key]);
				return next;
			});
		});
	}, []);

	const bodyRowClick = useCallback(({ rowKeys }: { rowKeys: string[] }) => {
		startTransition(() => {
			setRowClickObj((old) => {
				const next: Record<string, boolean> = {};
				for (let i = 0; i < rowKeys.length; i++) {
					const key = rowKeys[i];
					if (old[key] === true) return {};
					next[key] = true;
				}
				return next;
			});
		});
	}, []);

	return { getBodyCellBg, getHeadCellBg, bodyRowMouseEnter, bodyRowMouseLeave, bodyRowClick };
};

export default useTableCellBg;
