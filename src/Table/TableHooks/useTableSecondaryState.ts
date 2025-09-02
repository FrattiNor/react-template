import { useMemo } from 'react';
import type { TableDataItem, TableProps } from '../TableTypes/type';
import type useTableState from './useTableState';

type Props<T extends TableDataItem> = {
	props: TableProps<T>;
	tableState: ReturnType<typeof useTableState>;
};

// 表格二级状态
const useTableSecondaryState = <T extends TableDataItem>({ props, tableState }: Props<T>) => {
	const gridTemplateColumns = useMemo(() => {
		return props.columns
			.map(({ key, width }) => {
				if (typeof tableState.columnSizes[key] === 'number') return `${tableState.columnSizes[key]}px`;
				return typeof width === 'number' ? `${width}px` : width;
			})
			.join(' ');
	}, [props.columns, tableState.columnSizes]);

	useMemo(() => {}, [props.columns, tableState.columnSizes]);

	return { gridTemplateColumns };
};

export default useTableSecondaryState;
