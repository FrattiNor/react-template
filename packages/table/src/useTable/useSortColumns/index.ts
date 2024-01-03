import { useTableDataContext } from '../../TableDataContext';
import { TableColumn, TableFixed } from '../../type';
import { useMemo, useState } from 'react';

const fixedNumMap = {
    left: -1,
    right: 1,
    default: 0,
};

type Opt<T> = {
    columns: TableColumn<T>[];
};

const useSortColumns = <T>(opt: Opt<T>) => {
    const { columns } = opt;
    const dataContext = useTableDataContext();
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

    const sortedColumns = useMemo(() => {
        const newColumns: (TableColumn<T> & { index: number })[] = [];

        columns.forEach((item, index) => {
            if (!hiddenConf[item.key]) {
                newColumns.push({
                    ...item,
                    index: indexConf[item.key] ?? index,
                    fixed: fixedConf[item.key] ?? item.fixed,
                    width: widthConf[item.key] ?? item.width,
                });
            }
        });

        // 根据index排序后的columns
        const indexSortedColumns = newColumns.sort((a, b) => a.index - b.index);
        // 根据fixed排序后的columns
        const fixedSortedColumns = indexSortedColumns.sort((a, b) => fixedNumMap[a.fixed ?? 'default'] - fixedNumMap[b.fixed ?? 'default']);

        return fixedSortedColumns;
    }, [columns, indexConf, widthConf, hiddenConf, fixedConf]);

    return { sortedColumns, setIndexConf, setWidthConf, setHiddenConf, setFixedConf };
};

export default useSortColumns;
