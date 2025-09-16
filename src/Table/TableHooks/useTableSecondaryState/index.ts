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
	const { columnSizes, getColumnSize } = tableState;
	const { columnsFlat, columnsFixedKeys } = tableProps;

	const { gridTemplateColumnsArr, HTotalSize, fixedRightObj, fixedLeftObj } = useMemo(() => {
		let HTotalSize: number = 0;
		const gridTemplateColumnsArr: string[] = [];
		const fixedLeftObj: Record<string, { stickySize: number; pingedSize: number; index: number }> = {};
		const fixedRightObj: Record<string, { stickySize: number; pingedSize: number; index: number }> = {};
		const fixedLeftSizeArr: { size: number; leftTotalSize: number; index: number }[] = [];
		const fixedRightSizeArr: { size: number; leftTotalSize: number; index: number }[] = [];

		let totalSize = 0;
		columnsFlat.forEach(({ key, fixed }, index) => {
			const size = getColumnSize(key);
			gridTemplateColumnsArr.push(`${size}px`);
			HTotalSize += size;
			totalSize += size;
			if (fixed === 'left') {
				fixedLeftSizeArr.push({ size, leftTotalSize: totalSize, index });
			}
			if (fixed === 'right') {
				fixedRightSizeArr.unshift({ size, leftTotalSize: totalSize, index });
			}
		});

		let calcSize = 0;
		fixedLeftSizeArr.forEach(({ size, leftTotalSize, index }) => {
			fixedLeftObj[index] = { stickySize: calcSize, pingedSize: leftTotalSize - size - calcSize, index };
			calcSize += size;
		});

		calcSize = 0;
		fixedRightSizeArr.forEach(({ size, leftTotalSize, index }) => {
			fixedRightObj[index] = { stickySize: calcSize, pingedSize: totalSize - leftTotalSize - calcSize, index };
			calcSize += size;
		});

		return { gridTemplateColumnsArr, HTotalSize, fixedLeftObj, fixedRightObj };
	}, [columnsFixedKeys, columnSizes]);

	return { gridTemplateColumnsArr, HTotalSize, fixedRightObj, fixedLeftObj };
};

export default useTableSecondaryState;
