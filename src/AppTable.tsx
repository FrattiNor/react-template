import type { FC } from 'react';
import columns from './AppTable.columns';
import SimpleTable from './SimpleTable';
import data from './AppTable.data';

console.log('data', data);

const AppTable: FC = () => {
	return <SimpleTable data={data} columns={columns} rowKey="userId" />;
};

export default AppTable;
