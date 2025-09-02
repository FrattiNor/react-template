import type { TableDataItem, TableProps } from '../TableTypes/type';
import useTableDomRef from './useTableDomRef';
import useTableState from './useTableState';
import useTableSecondaryState from './useTableSecondaryState';
import useTableTools from './useTableTools';
import useTableSticky from './useTableSticky';
import useTableResize from './useTableResize';

// 表格实例
const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	const tableState = useTableState();
	const tableDomRef = useTableDomRef({ tableState });
	const tableSecondaryState = useTableSecondaryState({ tableState, props });
	const tableTools = useTableTools({ props });
	const tableResize = useTableResize({ tableState });
	useTableSticky({ tableDomRef, tableState });
	return { props, tableResize, tableDomRef, tableState, tableSecondaryState, tableTools };
};

export default useTableInstance;
