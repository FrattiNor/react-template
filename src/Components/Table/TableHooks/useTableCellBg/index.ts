import { startTransition, useCallback, useEffect } from 'react';

import type { TableDataItem } from '../../TableTypes/type';
import type useTableProps from '../useTableProps';
import type useTableRowSelection from '../useTableRowSelection';
import type useTableState from '../useTableState';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableState: ReturnType<typeof useTableState>;
	tableRowSelection: ReturnType<typeof useTableRowSelection<T>>;
};

// 表格 单元格 背景色
// 根据点击、hover、resize决定
const useTableCellBg = <T extends TableDataItem>({ tableState, tableProps, tableRowSelection }: Props<T>) => {
	const { selectRowKeysObj } = tableRowSelection;
	const { rowClick = true, rowHover = true, rowSelect = true } = tableProps?.rowBgHighlight ?? {};
	const { rowClickObj, rowHoverObj, setRowHoverObj, setRowClickObj, getColResized } = tableState;

	// 配置变更时触发清除原本数据
	useEffect(() => {
		if (rowClick === false) {
			setRowClickObj({});
		}
	}, [rowClick]);

	// 配置变更时触发清除原本数据
	useEffect(() => {
		if (rowHover === false) {
			setRowHoverObj({});
		}
	}, [rowHover]);

	// 获取是否被click
	const getClicked = useCallback(
		({ rowKeys }: { rowKeys: string[] }) => {
			return rowKeys.some((key) => rowClickObj[key] === true);
		},
		[rowClickObj],
	);

	// 获取是否被hover
	const getHovered = useCallback(
		({ rowKeys }: { rowKeys: string[] }) => {
			return rowKeys.some((key) => rowHoverObj[key] === true);
		},
		[rowHoverObj],
	);

	// 获取是否被select
	const getSelected = useCallback(
		({ rowKeys }: { rowKeys: string[] }) => {
			return rowKeys.some((key) => selectRowKeysObj[key] === true);
		},
		[selectRowKeysObj],
	);

	// 获取body cell 背景色
	// 根据resize、hover、select、click决定，存在3档颜色
	const getBodyCellBg = useCallback(
		({ rowKeys, colIndexs, defaultBgLevel }: { rowKeys: string[]; colIndexs: [number] | [number, number]; defaultBgLevel?: number }) => {
			let bgColorLevel = defaultBgLevel ?? 0;
			const start = colIndexs[0];
			const end = colIndexs[colIndexs.length - 1];
			if (getColResized(start) || getColResized(end)) bgColorLevel++;
			if (rowClick === true && getClicked({ rowKeys }) === true) bgColorLevel++;
			if (rowHover === true && getHovered({ rowKeys }) === true) bgColorLevel++;
			if (rowSelect === true && getSelected({ rowKeys }) === true) bgColorLevel++;
			if (bgColorLevel === 0) return 'var(--table-body-cell-bg)';
			if (bgColorLevel === 1) return 'var(--table-body-cell-active-bg-L1)';
			if (bgColorLevel === 2) return 'var(--table-body-cell-active-bg-L2)';
			if (bgColorLevel >= 3) return 'var(--table-body-cell-active-bg-L3)';
			return 'var(--table-body-cell-bg)';
		},
		[getColResized, getClicked, getHovered, getSelected, rowClick, rowHover, rowSelect],
	);

	// 获取head cell 背景色
	// 根据resize决定，存在1档颜色
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

	const bodyRowMouseEnter = useCallback(
		({ rowKeys }: { rowKeys: string[] }) => {
			if (rowHover === true) {
				startTransition(() => {
					const next: Record<string, boolean> = {};
					rowKeys.forEach((key) => (next[key] = true));
					setRowHoverObj(next);
				});
			}
		},
		[rowHover],
	);

	const bodyRowMouseLeave = useCallback(
		({ rowKeys }: { rowKeys: string[] }) => {
			if (rowHover === true) {
				startTransition(() => {
					setRowHoverObj((old) => {
						const next = { ...old };
						rowKeys.forEach((key) => delete next[key]);
						return next;
					});
				});
			}
		},
		[rowHover],
	);

	const bodyRowClick = useCallback(
		({ rowKeys }: { rowKeys: string[] }) => {
			if (rowClick === true) {
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
			}
		},
		[rowClick],
	);

	return { getBodyCellBg, getHeadCellBg, bodyRowMouseEnter, bodyRowMouseLeave, bodyRowClick };
};

export default useTableCellBg;
