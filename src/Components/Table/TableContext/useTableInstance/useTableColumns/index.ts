import { useMemo } from 'react';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableProps } from '../../../TableTypes/typeProps';

const useTableColumns = <T extends TableDataItem>(props: TableProps<T>) => {
	const columns = props.columns;

	const gridTemplateColumns = useMemo(() => {
		return columns.map(() => '150px').join(' ');
	}, [columns]);

	return { gridTemplateColumns };
};

export default useTableColumns;
