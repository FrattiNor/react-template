import { useMemo } from 'react';
import type { TableDataItem } from '../TableTypes/type';
import type useTableState from './useTableState';
import type useTableProps from './useTableProps';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableState: ReturnType<typeof useTableState>;
};

// 表格二级状态
const useTableSecondaryState = <T extends TableDataItem>({ tableProps, tableState }: Props<T>) => {
	const { gridTemplateColumnsArr, fixedRightObj, fixedLeftObj } = useMemo(() => {
		const gridTemplateColumnsArr: string[] = [];
		const fixedLeftObj: Record<string, number> = {};
		const fixedRightObj: Record<string, number> = {};
		const fixedLeftSizeArr: { key: string; size: number }[] = [];
		const fixedRightSizeArr: { key: string; size: number }[] = [];

		tableProps.columns.forEach(({ key, fixed }) => {
			if (typeof tableState.columnSizes[key] === 'number') {
				gridTemplateColumnsArr.push(`${tableState.columnSizes[key]}px`);
			} else {
				gridTemplateColumnsArr.push('0px');
			}
			if (fixed === 'left') {
				fixedLeftSizeArr.push({ key, size: tableState.columnSizes[key] ?? 0 });
			}
			if (fixed === 'right') {
				fixedRightSizeArr.unshift({ key, size: tableState.columnSizes[key] ?? 0 });
			}
		});

		let leftSize = 0;
		fixedLeftSizeArr.forEach(({ key, size }) => {
			fixedLeftObj[key] = leftSize;
			leftSize += size;
		});

		let rightSize = 0;
		fixedRightSizeArr.forEach(({ key, size }) => {
			fixedRightObj[key] = rightSize;
			rightSize += size;
		});

		return { gridTemplateColumnsArr, fixedLeftObj, fixedRightObj };
	}, [tableProps.columnsFixedKeys, tableState.columnSizes]);

	return { gridTemplateColumnsArr, fixedRightObj, fixedLeftObj };
};

export default useTableSecondaryState;
