import { TableColumn } from '../../type';

const fixedNumMap = {
    left: -1,
    default: 0,
    right: 1,
};

type Opt<T> = {
    columns: TableColumn<T>[];
};

const useSortColumns = <T>(opt: Opt<T>) => {
    const { columns } = opt;

    // 根据fixed排序后的columns
    const sortedColumns = columns.sort((a, b) => fixedNumMap[a.fixed ?? 'default'] - fixedNumMap[b.fixed ?? 'default']);

    return sortedColumns;
};

export default useSortColumns;
