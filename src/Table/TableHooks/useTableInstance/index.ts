import useTableCellBg from '../useTableCellBg';
import useTableColumn from '../useTableColumn';
import useTableData from '../useTableData';
import useTableDomRef from '../useTableDomRef';
import useTableMeasureCol from '../useTableMeasureCol';
import useTableObserver from '../useTableObserver';
import useTableProps from '../useTableProps';
import useTableResize from '../useTableResize';
import useTableSecondaryState from '../useTableSecondaryState';
import useTableState from '../useTableState';
import useTableSticky from '../useTableSticky';
import useTableTools from '../useTableTools';
import useTableVirtual from '../useTableVirtual';

import type { TableDataItem, TableProps } from '../../TableTypes/type';

// 表格实例
const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	// state
	const tableState = useTableState();
	// dom
	const tableDomRef = useTableDomRef();
	// props
	const tableProps = useTableProps({ props });
	// column
	const tableColumn = useTableColumn({ tableProps });
	// 工具
	const tableTools = useTableTools({ tableProps, tableColumn });
	// data
	const tableData = useTableData({ tableProps, tableTools });
	// cell bg
	const tableCellBg = useTableCellBg({ tableState });
	// measure
	const tableMeasureCol = useTableMeasureCol({ tableState, tableColumn });
	// second state
	const tableSecondaryState = useTableSecondaryState({ tableState, tableColumn });
	// cell sticky
	const tableSticky = useTableSticky({ tableDomRef, tableState, tableSecondaryState });
	// virtual
	const tableVirtual = useTableVirtual({ tableDomRef, tableProps, tableState, tableTools, tableColumn });
	// cell resize
	const tableResize = useTableResize({ tableState, tableProps, tableColumn });
	// observer
	useTableObserver({ tableDomRef, tableState, tableMeasureCol, tableSecondaryState });

	// res
	return {
		tableProps: tableProps as Omit<ReturnType<typeof useTableProps<T>>, 'columns' | 'data'>,
		tableData,
		tableColumn,
		tableResize,
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
