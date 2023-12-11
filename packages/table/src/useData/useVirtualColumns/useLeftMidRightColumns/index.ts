import { Column } from '../../../type';

type Opt<T> = {
    columns: Array<Column<T>>;
};

const useLeftMidRightColumns = <T extends Record<string, any>>(opt: Opt<T>) => {
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

    return { midColumns, leftColumns, rightColumns };
};

export type LeftMidRightColumns<T extends Record<string, any>> = ReturnType<typeof useLeftMidRightColumns<T>>;
export default useLeftMidRightColumns;
