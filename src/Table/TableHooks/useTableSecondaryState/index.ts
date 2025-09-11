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
		const fixedLeftObj: Record<string, { stickySize: number; pingedSize: number; index: number }> = {};
		const fixedRightObj: Record<string, { stickySize: number; pingedSize: number; index: number }> = {};
		const fixedLeftSizeArr: { key: string; size: number; leftTotalSize: number; index: number }[] = [];
		const fixedRightSizeArr: { key: string; size: number; leftTotalSize: number; index: number }[] = [];

		let totalSize = 0;
		tableProps.columnsFlat.forEach(({ key, fixed }, index) => {
			const size = tableState.columnSizes[key] ?? 0;
			gridTemplateColumnsArr.push(`${size}px`);
			totalSize += size;
			if (fixed === 'left') {
				fixedLeftSizeArr.push({ key, size, leftTotalSize: totalSize, index });
			}
			if (fixed === 'right') {
				fixedRightSizeArr.unshift({ key, size, leftTotalSize: totalSize, index });
			}
		});

		let calcSize = 0;
		fixedLeftSizeArr.forEach(({ key, size, leftTotalSize, index }) => {
			fixedLeftObj[key] = { stickySize: calcSize, pingedSize: leftTotalSize - size - calcSize, index };
			calcSize += size;
		});

		calcSize = 0;
		fixedRightSizeArr.forEach(({ key, size, leftTotalSize, index }) => {
			fixedRightObj[key] = { stickySize: calcSize, pingedSize: totalSize - leftTotalSize - calcSize, index };
			calcSize += size;
		});

		return { gridTemplateColumnsArr, fixedLeftObj, fixedRightObj };
	}, [tableProps.columnsFixedKeys, tableState.columnSizes]);

	return { gridTemplateColumnsArr, fixedRightObj, fixedLeftObj };
};

export default useTableSecondaryState;
