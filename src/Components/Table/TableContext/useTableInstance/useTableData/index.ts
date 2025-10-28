import type { TableDataItem } from '../../../TableTypes/type';
import type { TableProps } from '../../../TableTypes/typeProps';

const useTableData = <T extends TableDataItem>(props: TableProps<T>) => {
	const rowKey = props.rowKey;

	const getRowKey = (item: T, index: number) => {
		if (typeof rowKey === 'function') return rowKey(item, index);
		return item[rowKey] as string;
	};

	return { getRowKey };
};

export default useTableData;
