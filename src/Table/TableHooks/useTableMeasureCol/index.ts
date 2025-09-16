import { useCallback, useLayoutEffect, type CSSProperties } from 'react';
import type { TableDataItem } from '../../TableTypes/type';
import type useTableProps from '../useTableProps';
import type useTableState from '../useTableState';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableState: ReturnType<typeof useTableState>;
};

// 测量列宽
const useTableMeasureCol = <T extends TableDataItem>({ tableProps, tableState }: Props<T>) => {
	const { columnsWidthKeys, columnsFlat } = tableProps;
	const { minColWidth, maxColWidth, columnSizes, resized, bodyClientWidth, setColumnSizes, needMeasure, setNeedMeasure } = tableState;

	// 垂直滚动条是否存在、并且没有resize过
	useLayoutEffect(() => {
		if (bodyClientWidth > 0 && resized === false) {
			setColumnSizes({});
			setNeedMeasure(true);
		}
	}, [bodyClientWidth]);

	// column数量或者width变化
	useLayoutEffect(() => {
		// 未修改过宽度时，需要清空原来的宽度
		if (resized === false) setColumnSizes({});
		setNeedMeasure(true);
	}, [columnsWidthKeys]);

	// 测量样式
	const getMeasureStyle = useCallback(
		({ colIndex }: { colIndex: number }) => {
			const style: CSSProperties = {};
			const column = columnsFlat[colIndex];
			const oldSize = columnSizes[column.key];
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
		},
		[columnsFlat, columnSizes],
	);

	return { needMeasure, setNeedMeasure, getMeasureStyle };
};

export default useTableMeasureCol;
