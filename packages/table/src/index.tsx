/* eslint-disable react-refresh/only-export-components */
import { TableDataContextHoc, useTableDataContext } from './TableDataContext';
import { TableContextHoc } from './TableContext';
import Table from './Table';

export default TableContextHoc(Table);

export { TableDataContextHoc, useTableDataContext };

export type { TableRef, TableFixed, TableAlign, TableProps, TableColumn, TablePagination, TableExpandable, TableRowSelection } from './type';
