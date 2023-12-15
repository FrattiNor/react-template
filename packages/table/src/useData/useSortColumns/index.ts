import { Column } from '../../type';

const fixedNumMap: Record<string, number> = {
    left: -1,
    right: 1,
};

const useSortColumns = <T>(columns: Column<T>[]) => {
    return columns.sort((a, b) => (fixedNumMap[a.fixed || ''] ?? 0) - (fixedNumMap[b.fixed || ''] ?? 0));
};

export default useSortColumns;
