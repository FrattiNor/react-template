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
import useTableVirtual from '../useTableVirtual';

// 表格实例
const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	// state
	const tableState = useTableState();
	// dom
	const tableDomRef = useTableDomRef();
	// props
	const tableProps = useTableProps({ props });
	// 工具
	const tableTools = useTableTools({ tableProps });
	// cell bg
	const tableCellBg = useTableCellBg({ tableState });
	// measure
	const tableMeasureCol = useTableMeasureCol({ tableState, tableProps });
	// second state
	const tableSecondaryState = useTableSecondaryState({ tableState, tableProps });
	// cell sticky
	const tableSticky = useTableSticky({ tableDomRef, tableState, tableSecondaryState });
	// virtual
	const tableVirtual = useTableVirtual({ tableDomRef, tableProps, tableState, tableTools });
	// cell resize
	const tableResize = useTableResize({ tableState, tableProps });
	// logic
	useTableLogic({ tableDomRef, tableState, tableMeasureCol, tableSecondaryState });

	// res
	return {
		tableResize,
		tableProps,
		tableDomRef,
		tableState,
		tableSecondaryState,
		tableTools,
		tableCellBg,
		tableMeasureCol,
		tableSticky,
		tableVirtual,
	};
};

export default useTableInstance;
