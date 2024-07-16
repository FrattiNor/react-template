import { defaultFlexGrow, defaultWidth } from '../index';

import type {
    HandledColumn,
    HandledHeadGroupItem,
    TableColumn,
    TableColumnGroup,
    TableColumns,
    TableCoverConfRenderItem,
    TableFixed,
} from '../../type';
import type { DataSource } from '../useDataSource';
import type { Expandable } from '../useExpandable';
import type { HandledProps } from '../useHandleProps';
import type { RowSelection } from '../useRowSelection';

export type Opt<T> = {
    expandable: Expandable<T>;
    dataSource: DataSource<T>;
    handledProps: HandledProps<T>;
    rowSelection: RowSelection<T>;
};

// 可以利用Table元素获取宽度
const useHandleColumnsObj = <T>(opt: Opt<T>) => {
    const { handledProps, rowSelection, expandable, dataSource } = opt;
    const { forceHiddenColumn = {}, forceHiddenFilter = {}, coverColumns, coverColumnsSort } = handledProps;

    let summaryCount = 0;
    let handledColumnsKeyStr = '';
    let originHorizontalTotalSize = 0;

    const handledColumns: HandledColumn<T>[] = [];
    const handledHeadGroups: HandledHeadGroupItem[][] = [];

    (() => {
        const totalColumns = (() => {
            const copyColumns: TableColumns<T> =
                typeof coverColumnsSort === 'function'
                    ? [...handledProps.columns].sort((a, b) => coverColumnsSort(a) - coverColumnsSort(b))
                    : [...handledProps.columns];
            if (expandable.expandableColumn && dataSource.atLeastOneChildren === true) {
                copyColumns.unshift(expandable.expandableColumn);
            }
            if (rowSelection.rowSelectionColumn) {
                copyColumns.unshift(rowSelection.rowSelectionColumn);
            }
            return copyColumns;
        })();

        const traverseColumns = (columns: TableColumns<T>, parentCover: { fixed?: TableFixed } = {}, currentIndex = 0, currentLevel = 0) => {
            let index = currentIndex;

            for (let i = 0; i <= columns.length - 1; i++) {
                const _column = columns[i] as TableColumn<T>;
                // 内部的列不受影响【多选|展开】，且不存在是ColumnGroup的情况
                const column = _column.inner === true ? _column : { ..._column, ...(coverColumns ? coverColumns(columns[i]) : {}), ...parentCover };
                const columnGroup = column as TableColumnGroup<T>;

                if (forceHiddenColumn[column.key] !== true) {
                    if (column.hidden !== true) {
                        if (columnGroup.children) {
                            if (Array.isArray(columnGroup.children) && columnGroup.children.length > 0) {
                                const beforeInnerIndex = index;
                                index = traverseColumns(columnGroup.children, { fixed: columnGroup.fixed ?? 'default' }, index, currentLevel + 1);
                                const afterInnerIndex = index;
                                if (afterInnerIndex > beforeInnerIndex) {
                                    if (!handledHeadGroups[currentLevel]) handledHeadGroups[currentLevel] = [];
                                    handledHeadGroups[currentLevel].push({
                                        key: columnGroup.key,
                                        end: afterInnerIndex,
                                        start: beforeInnerIndex,
                                        title: columnGroup.title,
                                        span: afterInnerIndex - beforeInnerIndex,
                                    });
                                }
                            }
                        } else {
                            if (column.summary) {
                                if (Array.isArray(column.summary)) {
                                    summaryCount = Math.max(summaryCount, column.summary.length);
                                } else {
                                    summaryCount = Math.max(summaryCount, 1);
                                }
                            }

                            const handledColumn: HandledColumn<T> = {
                                ...column,
                                colIndex: index,
                                underRowSpan: currentLevel,
                                width: Math.max(50, column.width ?? defaultWidth), // 限制一下最小值，避免看不见列
                                flexGrow: column.flexGrow ?? defaultFlexGrow,
                            };

                            originHorizontalTotalSize += handledColumn.width;

                            if (forceHiddenFilter === 'all' || forceHiddenFilter[column.key] === true) delete handledColumn['filter'];

                            handledColumns.push(handledColumn);

                            handledColumnsKeyStr += `@#&${handledColumn.key}_${handledColumn.fixed}`;

                            index++;
                        }
                    }
                }
            }

            return index;
        };

        traverseColumns(totalColumns);
    })();

    const getSortedColumnsConf = () => {
        const copyColumns: TableColumns<T> =
            typeof coverColumnsSort === 'function'
                ? [...handledProps.columns].sort((a, b) => coverColumnsSort(a) - coverColumnsSort(b))
                : [...handledProps.columns];

        const couldSortColumns: TableCoverConfRenderItem[] = [];

        copyColumns.forEach((column) => {
            if (forceHiddenColumn[column.key] !== true) {
                const coveredColumn = {
                    ...column,
                    ...(coverColumns ? coverColumns(column) : {}),
                };
                couldSortColumns.push({
                    key: coveredColumn.key,
                    title: coveredColumn.title,
                    hidden: coveredColumn.hidden ?? false,
                    fixed: coveredColumn.fixed ?? 'default',
                });
            }
        });

        return couldSortColumns;
    };

    const getOriginColumnsConf = () => {
        const copyColumns: TableColumns<T> = [...handledProps.columns];

        const couldSortColumns: TableCoverConfRenderItem[] = [];

        copyColumns.forEach((item) => {
            if (forceHiddenColumn[item.key] !== true) {
                couldSortColumns.push({
                    key: item.key,
                    title: item.title,
                    hidden: item.hidden ?? false,
                    fixed: item.fixed ?? 'default',
                });
            }
        });

        return couldSortColumns;
    };

    return {
        summaryCount,
        handledColumns,
        handledHeadGroups,
        handledColumnsKeyStr,
        originHorizontalTotalSize,
        getSortedColumnsConf,
        getOriginColumnsConf,
    };
};

export type HandledColumnsObj<T> = ReturnType<typeof useHandleColumnsObj<T>>;
export default useHandleColumnsObj;
