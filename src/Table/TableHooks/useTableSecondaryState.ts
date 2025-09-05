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
	const gridTemplateColumns = useMemo(() => {
		return tableProps.columns
			.map(({ key, width }) => {
				if (typeof tableState.columnSizes[key] === 'number') return `${tableState.columnSizes[key]}px`;
				return typeof width === 'number' ? `${width}px` : width;
			})
			.join(' ');
	}, [tableProps.columnsKeys, tableState.columnSizes]);

	return { gridTemplateColumns };
};

export default useTableSecondaryState;
