import { TableColumnsConfItem, TableColumn, TableColumns } from '../../type';
import { useTableDataContext } from '../../TableDataContext';
import { useState } from 'react';

const fixedNumMap = {
    left: -1,
    right: 1,
    default: 0,
};

type Opt<T> = {
    columns: TableColumns<T>;
    indexColumns: TableColumns<T>;
    expandableColumns: TableColumns<T>;
    rowSelectionColumns: TableColumns<T>;
};

const useSortColumns = <T>(opt: Opt<T>) => {
    const dataContext = useTableDataContext();
    const { columns, indexColumns, expandableColumns, rowSelectionColumns } = opt;
    const [_columnsConf, _setColumnsConf] = useState<Record<string, TableColumnsConfItem>>({});
    const columnsConf = dataContext.columnsConf ?? _columnsConf;
    const setColumnsConf = dataContext.setColumnsConf ?? _setColumnsConf;

    const newColumns: (TableColumn<T> & { index: number })[] = [];

    rowSelectionColumns.forEach((item) => {
        if (!columnsConf[item.key]?.hidden) {
            newColumns.push({
                ...item,
                index: -3,
            });
        }
    });

    expandableColumns.forEach((item) => {
        if (!columnsConf[item.key]?.hidden) {
            newColumns.push({
                ...item,
                index: -2,
            });
        }
    });

    indexColumns.forEach((item) => {
        if (!columnsConf[item.key]?.hidden) {
            newColumns.push({
                ...item,
                index: -1,
            });
        }
    });

    columns.forEach((item) => {
        if (!columnsConf[item.key]?.hidden) {
            const confWidth = columnsConf[item.key]?.width;

            newColumns.push({
                ...item,
                width: confWidth ?? item.width,
                index: columnsConf[item.key]?.index ?? 9999,
                fixed: columnsConf[item.key]?.fixed ?? item.fixed,
                flexGrow: typeof confWidth === 'number' ? 0 : item.flexGrow,
            });
        }
    });

    // 根据index排序后的columns
    const indexSortedColumns = newColumns.sort((a, b) => a.index - b.index);
    // 根据fixed排序后的columns
    const fixedSortedColumns = indexSortedColumns.sort((a, b) => fixedNumMap[a.fixed ?? 'default'] - fixedNumMap[b.fixed ?? 'default']);

    return { sortedColumns: fixedSortedColumns, setColumnsConf };
};

export default useSortColumns;
