import Table from '../Table';
import { useTableAppContext } from '../TableAppContext';
import useColumns from './useColumns';
import useData from './useData';

const TableApp = () => {
	const columns = useColumns();
	const { data, loading } = useData();
	const { bordered } = useTableAppContext();
	return <Table data={data} columns={columns} rowKey={'id'} loading={loading} bordered={bordered} onResizeEnd={(obj) => console.log(obj)} />;
};

export default TableApp;
