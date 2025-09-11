import { useMemo } from 'react';
import type { TableDataItem } from '../../TableTypes/type';
import type useTableState from '../useTableState';
import type useTableProps from '../useTableProps';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableState: ReturnType<typeof useTableState>;
};

// 表格二级状态
const useTableSecondaryState = <T extends TableDataItem>({ tableProps, tableState }: Props<T>) => {
	const { gridTemplateColumnsArr, fixedRightObj, fixedLeftObj } = useMemo(() => {
		const gridTemplateColumnsArr: string[] = [];
		const fixedLeftObj: Record<string, { stickySize: number; leftSize: number }> = {};
		const fixedRightObj: Record<string, { stickySize: number; rightSize: number }> = {};
		const fixedLeftSizeArr: { key: string; size: number; leftTotalSize: number }[] = [];
		const fixedRightSizeArr: { key: string; size: number; leftTotalSize: number }[] = [];

		let totalSize = 0;
		tableProps.columns.forEach(({ key, fixed }) => {
			const size = tableState.columnSizes[key] ?? 0;
			gridTemplateColumnsArr.push(`${size}px`);
			totalSize += size;
			if (fixed === 'left') {
				fixedLeftSizeArr.push({ key, size, leftTotalSize: totalSize });
			}
			if (fixed === 'right') {
				fixedRightSizeArr.unshift({ key, size, leftTotalSize: totalSize });
			}
		});

		let leftSize = 0;
		fixedLeftSizeArr.forEach(({ key, size, leftTotalSize }) => {
			fixedLeftObj[key] = { stickySize: leftSize, leftSize: leftTotalSize - size };
			leftSize += size;
		});

		let rightSize = 0;
		fixedRightSizeArr.forEach(({ key, size, leftTotalSize }) => {
			fixedRightObj[key] = { stickySize: rightSize, rightSize: totalSize - leftTotalSize };
			rightSize += size;
		});

		return { gridTemplateColumnsArr, fixedLeftObj, fixedRightObj };
	}, [tableProps.columnsFixedKeys, tableState.columnSizes]);

	return { gridTemplateColumnsArr, fixedRightObj, fixedLeftObj };
};

export default useTableSecondaryState;
