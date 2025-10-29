import { Provider } from 'react-redux';
import TableDom from './TableDom';
import { TableContext, useTableInstance } from './TableContext';
import type { TableDataItem } from './TableTypes/type';
import type { TableProps } from './TableTypes/typeProps';
import { getStore } from './TableState';
import { memo, useState } from 'react';

const TableInner = <T extends TableDataItem>(props: TableProps<T>) => {
	const instance = useTableInstance(props);
	return (
		<TableContext value={instance as never}>
			<TableDom />
		</TableContext>
	);
};

const Table = <T extends TableDataItem>(props: TableProps<T>) => {
	if (props.logRender?.table) console.log('Table re-render');
	const [store] = useState(() => getStore());
	return (
		<Provider store={store}>
			<TableInner {...props} />
		</Provider>
	);
};

export default memo(Table) as typeof Table;
