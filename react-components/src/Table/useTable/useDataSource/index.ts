import { useMemo } from 'react';

import type { Expandable } from '../useExpandable';
import type { HandledProps } from '../useHandleProps';
import type { Pagination } from '../usePagination';

type Opt<T> = {
    handledProps: HandledProps<T>;
    pagination: Pagination;
    expandable: Expandable<T>;
};

const useDataSource = <T>(opt: Opt<T>) => {
    const { handledProps, pagination, expandable: tableInnerExpandable } = opt;
    const { dataSource, rowKey, expandable: propsExpandable } = handledProps;
    const { expandedRowKeysObj } = tableInnerExpandable;

    const havePagination = !!pagination;
    const current = !pagination ? 1 : pagination?.current;
    const pageSize = !pagination ? 10 : pagination?.pageSize;
    const localPagination = !pagination ? false : pagination.localPagination;

    // 分页数据源
    const paginationDatasource = useMemo(() => {
        if (havePagination && localPagination) {
            return dataSource?.slice(pageSize * (current - 1), pageSize * current);
        }

        return dataSource;
    }, [dataSource, current, pageSize, localPagination, havePagination]);

    // 展开数据源
    const { totalDataSource, showDataSource, dataSourceLevelMap, atLeastOneChildren } = useMemo(() => {
        let showDataSource: T[] = [];
        let totalDataSource: T[] = [];
        let atLeastOneChildren = false;
        const dataSourceLevelMap: Record<string, number> = {};

        if (propsExpandable) {
            const childrenColumnName = propsExpandable?.childrenColumnName ?? 'children';

            // parentOpened 需要自己的是打开状态并且自己的祖先也是打开状态
            const handleDataSource = (value: T[], opt?: { level: number; parentOpened: boolean }) => {
                value.forEach((item) => {
                    const key = (typeof rowKey === 'function' ? rowKey(item) : item[rowKey]) as string;
                    const currentOpened = expandedRowKeysObj[key] ?? false;
                    const children = (item as any)[childrenColumnName];
                    const { level = 0, parentOpened = true } = opt || {};
                    const haveChild = Array.isArray(children) && children.length > 0;

                    totalDataSource.push(item);
                    if (parentOpened) showDataSource.push(item);
                    if (parentOpened && level !== 0) dataSourceLevelMap[key] = level;
                    if (haveChild) {
                        atLeastOneChildren = true;
                        handleDataSource(children, { level: level + 1, parentOpened: parentOpened && currentOpened });
                    }
                });
            };

            handleDataSource(paginationDatasource ?? []);
        } else {
            showDataSource = paginationDatasource ?? [];
            totalDataSource = paginationDatasource ?? [];
        }

        return { totalDataSource, showDataSource, dataSourceLevelMap, atLeastOneChildren };
    }, [paginationDatasource, expandedRowKeysObj]);

    return { paginationDatasource, totalDataSource, showDataSource, dataSourceLevelMap, atLeastOneChildren };
};

export type DataSource<T> = ReturnType<typeof useDataSource<T>>;
export default useDataSource;
