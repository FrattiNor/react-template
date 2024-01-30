import { useState } from 'react';

import { TableColumnsConfItem, TableColumn, TableColumns } from '../../type';

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

const useSortConfColumns = <T>(opt: Opt<T>) => {
    const { columns, indexColumns, expandableColumns, rowSelectionColumns } = opt;

    const [columnsConf, setColumnsConf] = useState<Record<string, TableColumnsConfItem>>({});

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

    [...indexColumns, ...columns].forEach((item) => {
        if (!columnsConf[item.key]?.hidden) {
            newColumns.push({
                ...item,
                index: columnsConf[item.key]?.index ?? 9999,
                fixed: columnsConf[item.key]?.fixed ?? item.fixed,
            });
        }
    });

    // 根据index排序后的columns
    const indexSortedColumns = newColumns.sort((a, b) => a.index - b.index);
    // 根据fixed排序后的columns
    const fixedSortedColumns = indexSortedColumns.sort((a, b) => fixedNumMap[a.fixed ?? 'default'] - fixedNumMap[b.fixed ?? 'default']);

    return { sortedColumns: fixedSortedColumns, columnsConf, setColumnsConf };
};

export default useSortConfColumns;
