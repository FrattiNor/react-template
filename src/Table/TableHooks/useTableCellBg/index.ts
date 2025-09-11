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

	const getBodyCellBg = ({ rowKey, colKey }: { rowKey: string; colKey: string }) => {
		if (typeof rowKey !== 'string') return 'var(--table-body-cell-bg)';
		let bgColorLevel = 0;
		if (tableResize.resizeKey === colKey) bgColorLevel++;
		if (rowClickObj[rowKey] === true) bgColorLevel++;
		if (rowHoverObj[rowKey] === true) bgColorLevel++;
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

	const bodyRowMouseEnter = ({ rowKey }: { rowKey: string }) => {
		startTransition(() => {
			setRowHoverObj({ [rowKey]: true });
		});
	};

	const bodyRowMouseLeave = ({ rowKey }: { rowKey: string }) => {
		startTransition(() => {
			setRowHoverObj((old) => {
				const next = { ...old };
				delete next[rowKey];
				return next;
			});
		});
	};

	const bodyRowClick = ({ rowKey }: { rowKey: string }) => {
		startTransition(() => {
			setRowClickObj((old) => {
				if (old[rowKey] === true) return {};
				return { [rowKey]: true };
			});
		});
	};

	return { getBodyCellBg, getHeadCellBg, bodyRowMouseEnter, bodyRowMouseLeave, bodyRowClick };
};

export default useTableCellBg;
