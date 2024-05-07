import type { TableColumns } from '../../type';
import type { DataSource } from '../useDataSource';
import type { Expandable } from '../useExpandable';
import type { RowSelection } from '../useRowSelection';

const fixedNumMap = {
    left: -1,
    right: 1,
    default: 0,
};

type Opt<T> = {
    columns: TableColumns<T>;
    rowSelection: RowSelection<T>;
    expandable: Expandable<T>;
    dataSource: DataSource<T>;
};

const useSortConfColumns = <T>(opt: Opt<T>) => {
    const { columns, expandable, rowSelection, dataSource } = opt;

    // 根据fixed排序后的columns
    const sortedColumns = (() => {
        const nextColumns: TableColumns<T> = [...columns].sort((a, b) => fixedNumMap[a.fixed ?? 'default'] - fixedNumMap[b.fixed ?? 'default']);

        if (expandable.expandableColumn && dataSource.atLeastOneChildren === true) {
            nextColumns.unshift(expandable.expandableColumn);
        }

        if (rowSelection.rowSelectionColumn) {
            nextColumns.unshift(rowSelection.rowSelectionColumn);
        }

        return nextColumns;
    })();

    return sortedColumns;
};

export default useSortConfColumns;
