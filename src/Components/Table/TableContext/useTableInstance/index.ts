import type { TableDataItem } from '../../TableTypes/type';
import type { TableProps } from '../../TableTypes/typeProps';

const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	return { props };
};

export default useTableInstance;
