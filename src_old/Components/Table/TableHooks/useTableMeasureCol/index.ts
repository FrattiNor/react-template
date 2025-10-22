import { useCallback, useLayoutEffect, type CSSProperties } from 'react';

import { debounce } from '../../TableUtils';

import type { TableDataItem } from '../../TableTypes/type';
import type useTableColumn from '../useTableColumn';
import type useTableState from '../useTableState';

type Props<T extends TableDataItem> = {
	tableColumn: ReturnType<typeof useTableColumn<T>>;
	tableState: ReturnType<typeof useTableState>;
};

// 测量列宽
const useTableMeasureCol = <T extends TableDataItem>({ tableColumn, tableState }: Props<T>) => {
	const { columnsWidthKeys, columnsFlat } = tableColumn;
	const { minColWidth, maxColWidth, columnSizes, resized, bodyClientWidth, V_ScrollbarWidth, colMeasure, setColMeasure } = tableState;

	// body宽度变化、并且没有resize过
	// 增加防抖
	const bodyWidthChangeCallback = useCallback(() => {
		debounce(() => {
			setColMeasure((old) => {
				if (old.measure === true) return old;
				return { measure: true, clear: true };
			});
		}, 500)();
	}, []);
	useLayoutEffect(() => {
		if (bodyClientWidth > 0 && resized === false) {
			bodyWidthChangeCallback();
		}
	}, [bodyClientWidth]);

	// 垂直滚动条是否存在、并且没有resize过
	// 不需要防抖
	useLayoutEffect(() => {
		if (resized === false) {
			setColMeasure((old) => {
				if (old.measure === true) return old;
				return { measure: true, clear: true };
			});
		}
	}, [V_ScrollbarWidth]);

	// column数量或者width变化
	useLayoutEffect(() => {
		// 未修改过宽度时，需要清空原来的宽度
		setColMeasure((old) => {
			if (old.measure === true) return old;
			return { measure: true, clear: resized === false };
		});
	}, [columnsWidthKeys]);

	// 测量样式
	const getMeasureStyle = useCallback(
		({ colIndex }: { colIndex: number }) => {
			const style: CSSProperties = {};
			const column = columnsFlat[colIndex];

			style.flexGrow = column.flexGrow ?? 1;
			style.width = (() => {
				const _size = column.width;
				if (typeof _size !== 'number') return _size;
				return Math.min(maxColWidth, Math.max(minColWidth, _size));
			})();

			// 不需要清空时，尝试获取oldSize
			if (colMeasure.clear !== true) {
				const oldSize = columnSizes[column.key];
				if (typeof oldSize === 'number') {
					style.flexGrow = undefined;
					style.width = oldSize;
				}
			}

			return style;
		},
		[columnsFlat, columnSizes, colMeasure],
	);

	return { getMeasureStyle };
};

export default useTableMeasureCol;
