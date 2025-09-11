import { startTransition } from 'react';
import type useTableResize from '../useTableResize';
import type useTableState from '../useTableState';

type Props = {
	tableResize: ReturnType<typeof useTableResize>;
	tableState: ReturnType<typeof useTableState>;
};

// 表格 单元格 背景色
const useTableCellBg = ({ tableResize, tableState }: Props) => {
	const { rowClickObj, rowHoverObj, setRowHoverObj, setRowClickObj } = tableState;

	const getClicked = ({ rowKeys }: { rowKeys: string[] }) => {
		return rowKeys.some((key) => rowClickObj[key] === true);
	};

	const getHovered = ({ rowKeys }: { rowKeys: string[] }) => {
		return rowKeys.some((key) => rowHoverObj[key] === true);
	};

	const getBodyCellBg = ({ rowKeys, colKey }: { rowKeys: string[]; colKey: string }) => {
		let bgColorLevel = 0;
		if (tableResize.resizeKey === colKey) bgColorLevel++;
		if (getClicked({ rowKeys }) === true) bgColorLevel++;
		if (getHovered({ rowKeys }) === true) bgColorLevel++;
		if (bgColorLevel === 0) return 'var(--table-body-cell-bg)';
		if (bgColorLevel === 1) return 'var(--table-body-cell-active-bg-L1)';
		if (bgColorLevel >= 2) return 'var(--table-body-cell-active-bg-L2)';
		return 'var(--table-body-cell-bg)';
	};

	const getHeadCellBg = ({ colKey }: { colKey: string }) => {
		let bgColorLevel = 0;
		if (tableResize.resizeKey === colKey) bgColorLevel++;
		if (bgColorLevel === 0) return 'var(--table-head-cell-bg)';
		if (bgColorLevel === 1) return 'var(--table-head-cell-active-bg)';
		return 'var(--table-head-cell-bg)';
	};

	const bodyRowMouseEnter = ({ rowKeys }: { rowKeys: string[] }) => {
		startTransition(() => {
			const next: Record<string, boolean> = {};
			rowKeys.forEach((key) => (next[key] = true));
			setRowHoverObj(next);
		});
	};

	const bodyRowMouseLeave = ({ rowKeys }: { rowKeys: string[] }) => {
		startTransition(() => {
			setRowHoverObj((old) => {
				const next = { ...old };
				rowKeys.forEach((key) => delete next[key]);
				return next;
			});
		});
	};

	const bodyRowClick = ({ rowKeys }: { rowKeys: string[] }) => {
		startTransition(() => {
			setRowClickObj((old) => {
				const next = { ...old };
				rowKeys.forEach((key) => {
					if (next[key] === true) {
						delete next[key];
					} else {
						next[key] = true;
					}
				});
				return next;
			});
		});
	};

	return { getBodyCellBg, getHeadCellBg, bodyRowMouseEnter, bodyRowMouseLeave, bodyRowClick };
};

export default useTableCellBg;
