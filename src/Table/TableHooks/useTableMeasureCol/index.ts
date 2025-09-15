import { useMemo, type CSSProperties } from 'react';
import type { TableDataItem } from '../../TableTypes/type';
import type useTableProps from '../useTableProps';
import type useTableState from '../useTableState';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableState: ReturnType<typeof useTableState>;
};

// 测量列宽
const useTableMeasureCol = <T extends TableDataItem>({ tableProps, tableState }: Props<T>) => {
	const { minColWidth, maxColWidth } = tableState;

	// 是否需要测量
	const needMeasure = useMemo(() => {
		let need = false;
		for (let i = 0; i < tableProps.columnsFlat.length; i++) {
			const column = tableProps.columnsFlat[i];
			if (typeof tableState.columnSizes[column.key] !== 'number') {
				need = true;
				break;
			}
		}
		return need;
	}, [tableProps.columnsKeys, tableState.columnSizes]);

	// 测量样式
	const getMeasureStyle = ({ colIndex }: { colIndex: number }) => {
		const style: CSSProperties = {};
		const column = tableProps.columnsFlat[colIndex];
		const oldSize = tableState.columnSizes[column.key];
		if (typeof oldSize === 'number') {
			style.width = oldSize;
		} else {
			const size = () => {
				const _size = column.width;
				if (typeof _size !== 'number') return _size;
				return Math.min(maxColWidth, Math.max(minColWidth, _size));
			};
			style.width = size();
			style.flexGrow = column.flexGrow ?? 1;
		}
		return style;
	};

	return { needMeasure, getMeasureStyle };
};

export default useTableMeasureCol;
