import { Provider } from 'react-redux';
import TableDom from './TableDom';
import { TableContext, useTableInstance } from './TableContext';
import type { TableDataItem } from './TableTypes/type';
import type { TableProps } from './TableTypes/typeProps';
import { getStore } from './TableState';
import { memo, useState } from 'react';

const Table = <T extends TableDataItem>(props: TableProps<T>) => {
	console.log('Table re-render');
	const instance = useTableInstance(props);
	const [store] = useState(() => getStore());
	return (
		<Provider store={store}>
			<TableContext value={instance as never}>
				<TableDom />
			</TableContext>
		</Provider>
	);
};

export default memo(Table) as typeof Table;
