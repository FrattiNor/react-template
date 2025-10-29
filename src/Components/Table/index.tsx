import TableDom from './TableDom';
import type { TableDataItem } from './TableTypes/type';
import type { TableProps } from './TableTypes/typeProps';
import { memo } from 'react';
import useTableInstance from './useTableInstance';

const Table = <T extends TableDataItem>(props: TableProps<T>) => {
	if (props.logRender?.table) console.log('Table re-render');
	const instance = useTableInstance(props);
	return <TableDom {...instance} />;
};

export default memo(Table) as typeof Table;
