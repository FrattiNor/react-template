import useTableCellBg from '../useTableCellBg';
import useTableColumn from '../useTableColumn';
import useTableData from '../useTableData';
import useTableDomRef from '../useTableDomRef';
import useTableDraggable from '../useTableDraggable';
import useTableMeasureCol from '../useTableMeasureCol';
import useTableObserver from '../useTableObserver';
import useTableProps from '../useTableProps';
import useTableResize from '../useTableResize';
import useTableRowSelection from '../useTableRowSelection';
import useTableSecondaryState from '../useTableSecondaryState';
import useTableState from '../useTableState';
import useTableSticky from '../useTableSticky';
import { useTableTools_1 } from '../useTableTools';
import useTableVirtual from '../useTableVirtual';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableProps } from '../../TableTypes/typeProps';

// 表格实例
const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	// state
	const tableState = useTableState();
	// dom
	const tableDomRef = useTableDomRef();
	// props
	const tableProps = useTableProps({ props });
	// 工具
	const tableTools_1 = useTableTools_1({ tableProps });
	// data
	const tableData = useTableData({ tableProps, tableTools_1 });
	// draggable
	const tableDraggable = useTableDraggable({ tableProps, tableTools_1 });
	// row select
	const tableRowSelection = useTableRowSelection({ tableData, tableProps, tableTools_1 });
	// column
	const tableColumn = useTableColumn({ tableProps, tableRowSelection, tableDraggable });
	// cell bg
	const tableCellBg = useTableCellBg({ tableState, tableProps, tableRowSelection });
	// measure
	const tableMeasureCol = useTableMeasureCol({ tableState, tableColumn });
	// second state
	const tableSecondaryState = useTableSecondaryState({ tableState, tableColumn });
	// cell sticky
	const tableSticky = useTableSticky({ tableDomRef, tableState, tableSecondaryState });
	// virtual
	const tableVirtual = useTableVirtual({ tableData, tableDomRef, tableProps, tableState, tableTools_1, tableColumn });
	// cell resize
	const tableResize = useTableResize({ tableState, tableProps, tableColumn });
	// observer
	useTableObserver({ tableDomRef, tableState, tableMeasureCol, tableSecondaryState });

	// res
	return {
		tableProps,
		tableData,
		tableColumn,
		tableResize,
		tableDomRef,
		tableState,
		tableSecondaryState,
		tableTools: tableTools_1,
		tableCellBg,
		tableMeasureCol,
		tableSticky,
		tableVirtual,
		tableDraggable,
	};
};

export default useTableInstance;
