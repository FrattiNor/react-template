import type { TableDataItem } from '../TableTypes/type';
import type { TableProps } from '../TableTypes/typeProps';

// 表格实例
const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	return { props };
};

export default useTableInstance;
