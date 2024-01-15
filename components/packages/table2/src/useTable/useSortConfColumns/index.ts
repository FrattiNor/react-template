import { TableColumns } from '../../type';
import { useMemo } from 'react';

const fixedNumMap = {
    left: -1,
    right: 1,
    default: 0,
};

type Opt<T> = {
    columns: TableColumns<T>;
};

const useSortConfColumns = <T>({ columns }: Opt<T>) => {
    // 根据fixed排序后的columns
    const sortedColumns = useMemo(() => columns.sort((a, b) => fixedNumMap[a.fixed ?? 'default'] - fixedNumMap[b.fixed ?? 'default']), [columns]);

    return { sortedColumns };
};

export default useSortConfColumns;
