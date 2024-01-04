import { TableColumn, TableColumns, TableFixed } from '../../type';
import { useTableDataContext } from '../../TableDataContext';
import { useState } from 'react';

const fixedNumMap = {
    left: -1,
    right: 1,
    default: 0,
};

type Opt<T> = {
    columns: TableColumns<T>;
    expandableColumns: TableColumns<T>;
    rowSelectionColumns: TableColumns<T>;
};

const useSortColumns = <T>(opt: Opt<T>) => {
    const dataContext = useTableDataContext();
    const { columns, expandableColumns, rowSelectionColumns } = opt;
    const [_indexConf, _setIndexConf] = useState<Record<string, number>>({});
    const [_widthConf, _setWidthConf] = useState<Record<string, number>>({});
    const [_hiddenConf, _setHiddenConf] = useState<Record<string, boolean>>({});
    const [_fixedConf, _setFixedConf] = useState<Record<string, TableFixed>>({});

    const indexConf = dataContext.indexConf ?? _indexConf;
    const setIndexConf = dataContext.setIndexConf ?? _setIndexConf;
    const widthConf = dataContext.widthConf ?? _widthConf;
    const setWidthConf = dataContext.setWidthConf ?? _setWidthConf;
    const hiddenConf = dataContext.hiddenConf ?? _hiddenConf;
    const setHiddenConf = dataContext.setHiddenConf ?? _setHiddenConf;
    const fixedConf = dataContext.fixedConf ?? _fixedConf;
    const setFixedConf = dataContext.setFixedConf ?? _setFixedConf;

    const newColumns: (TableColumn<T> & { index: number })[] = [];

    rowSelectionColumns.forEach((item) => {
        if (!hiddenConf[item.key]) {
            newColumns.push({
                ...item,
                index: -2,
            });
        }
    });

    expandableColumns.forEach((item) => {
        if (!hiddenConf[item.key]) {
            newColumns.push({
                ...item,
                index: -1,
            });
        }
    });

    columns.forEach((item) => {
        if (!hiddenConf[item.key]) {
            newColumns.push({
                ...item,
                index: indexConf[item.key] ?? 9999,
                fixed: fixedConf[item.key] ?? item.fixed,
                width: widthConf[item.key] ?? item.width,
            });
        }
    });

    // 根据index排序后的columns
    const indexSortedColumns = newColumns.sort((a, b) => a.index - b.index);
    // 根据fixed排序后的columns
    const fixedSortedColumns = indexSortedColumns.sort((a, b) => fixedNumMap[a.fixed ?? 'default'] - fixedNumMap[b.fixed ?? 'default']);

    return { sortedColumns: fixedSortedColumns, setIndexConf, setWidthConf, setHiddenConf, setFixedConf };
};

export default useSortColumns;
