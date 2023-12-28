/* eslint-disable react-refresh/only-export-components */
import { TableContextHoc } from './TableContext';
import { FC } from 'react';
import Dom from './Dom';

const Table: FC = () => {
    return <Dom />;
};

export default TableContextHoc(Table);
export type {
    TableRef,
    TableFixed,
    TableAlign,
    TableTheme,
    TablePagination,
    TableRowSelection,
    TableExpandable,
    TableProps,
    TableColumn,
} from './type';
