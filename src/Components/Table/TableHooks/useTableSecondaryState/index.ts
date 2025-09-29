import { useMemo } from 'react';

import type { TableDataItem } from '../../TableTypes/type';
import type useTableColumn from '../useTableColumn';
import type useTableState from '../useTableState';

type Props<T extends TableDataItem> = {
	tableColumn: ReturnType<typeof useTableColumn<T>>;
	tableState: ReturnType<typeof useTableState>;
};

// 表格二级状态
const useTableSecondaryState = <T extends TableDataItem>({ tableColumn, tableState }: Props<T>) => {
	const { columnsFlat, columnsFixedKeys } = tableColumn;
	const { columnSizes, V_ScrollbarWidth, getColumnSize } = tableState;

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

	const bodyGridTemplateColumns = useMemo(() => gridTemplateColumnsArr.join(' '), [gridTemplateColumnsArr]);

	const headGridTemplateColumns = useMemo(
		() => (V_ScrollbarWidth > 0 ? [...gridTemplateColumnsArr, `minmax(${V_ScrollbarWidth}px, 1fr)`].join(' ') : gridTemplateColumnsArr.join(' ')),
		[V_ScrollbarWidth, gridTemplateColumnsArr],
	);

	return { bodyGridTemplateColumns, headGridTemplateColumns, HTotalSize, fixedRightObj, fixedLeftObj };
};

export default useTableSecondaryState;
