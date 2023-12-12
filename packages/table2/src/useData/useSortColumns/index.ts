import { Column } from '../../type';

type Opt<T> = {
    columns: Array<Column<T>>;
};

const useSortColumns = <T>(opt: Opt<T>) => {
    const { columns } = opt;

    const midColumns: Column<T>[] = [];
    const leftColumns: Column<T>[] = [];
    const rightColumns: Column<T>[] = [];

    columns.forEach((column) => {
        if (column.fixed === 'left') {
            leftColumns.push(column);
        } else if (column.fixed === 'right') {
            rightColumns.push(column);
        } else {
            midColumns.push(column);
        }
    });

    return { midColumns, leftColumns, rightColumns, columns: [...midColumns, ...leftColumns, ...rightColumns] };
};

export type SortedColumns<T> = ReturnType<typeof useSortColumns<T>>;
export default useSortColumns;
