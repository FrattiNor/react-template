import type { TableDataItem, TableProps } from '../../TableTypes/type';
import useTableDomRef from '../useTableDomRef';
import useTableState from '../useTableState';
import useTableSecondaryState from '../useTableSecondaryState';
import useTableTools from '../useTableTools';
import useTableSticky from '../useTableSticky';
import useTableResize from '../useTableResize';
import useTableCellBg from '../useTableCellBg';
import useTableProps from '../useTableProps';
import useTableMeasureCol from '../useTableMeasureCol';
import useTableLogic from '../useTableLogic';

// 表格实例
const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	const tableState = useTableState();
	const tableDomRef = useTableDomRef();
	const tableProps = useTableProps({ props });
	const tableSecondaryState = useTableSecondaryState({ tableState, tableProps });
	const tableTools = useTableTools({ tableProps });
	const tableResize = useTableResize({ tableState });
	const tableCellBg = useTableCellBg({ tableState, tableResize });
	const tableMeasureCol = useTableMeasureCol({ tableState, tableProps });
	const tableSticky = useTableSticky({ tableDomRef, tableState, tableSecondaryState });
	useTableLogic({ tableDomRef, tableState, tableMeasureCol, tableSecondaryState });
	return { tableResize, tableProps, tableDomRef, tableState, tableSecondaryState, tableTools, tableCellBg, tableMeasureCol, tableSticky };
};

export default useTableInstance;
