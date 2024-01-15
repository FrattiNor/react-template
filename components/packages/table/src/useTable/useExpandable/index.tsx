/* eslint-disable @typescript-eslint/no-shadow */
import { HandledProps } from '../useHandleProps';
import { useMemo, useState } from 'react';
import { TableColumns } from '../../type';
import ExpandableFC from './Expandable';
import { TimeDebug } from '../useTimeDebug';

type Opt<T> = {
    timeDebug: TimeDebug;
    paginationDatasource: T[];
    handledProps: HandledProps<T>;
};

const useExpandable = <T,>(opt: Opt<T>) => {
    const { handledProps, paginationDatasource, timeDebug } = opt;

    timeDebug.start('useExpandable');

    const { rowKey, expandable } = handledProps;
    const expandableColumns: TableColumns<T> = [];
    const expandedKeysObj: Record<string, boolean> = {};
    const [_expandedRowKeys, _setExpandedRowKeys] = useState<string[]>([]);
    const width = typeof expandable !== 'boolean' ? expandable?.width ?? 42 : 42;
    const fixed = typeof expandable !== 'boolean' ? expandable?.fixed ?? 'left' : 'left';
    const childrenColumnName = typeof expandable !== 'boolean' ? expandable?.childrenColumnName ?? 'children' : 'children';
    const expandedRowKeys = typeof expandable !== 'boolean' ? expandable?.expandedRowKeys ?? _expandedRowKeys : _expandedRowKeys;
    const setExpandedRowKeys = typeof expandable !== 'boolean' ? expandable?.onChange ?? _setExpandedRowKeys : _setExpandedRowKeys;

    if (expandable) {
        expandedRowKeys.forEach((key) => {
            expandedKeysObj[key] = true;
        });
    }

    const { totalDataSource, showDataSource, dataSourceLevelMap, totalRowKeys } = useMemo(() => {
        let showDataSource: T[] = [];
        let totalDataSource: T[] = [];
        const totalRowKeys: string[] = [];
        const dataSourceLevelMap: Record<string, number> = {};

        if (expandable) {
            const handleDataSource = (value: T[], opt?: { level: number; parentOpened: boolean }) => {
                value.forEach((item) => {
                    const key = (typeof rowKey === 'function' ? rowKey(item) : item[rowKey]) as string;
                    const opened = expandedKeysObj[key] ?? false;
                    const children = (item as any)[childrenColumnName];
                    const { level = 0, parentOpened = true } = opt || {};
                    const haveChild = Array.isArray(children) && children.length > 0;

                    totalDataSource.push(item);
                    if (haveChild) totalRowKeys.push(key);
                    if (parentOpened) showDataSource.push(item);
                    if (parentOpened && level !== 0) dataSourceLevelMap[key] = level;
                    if (haveChild) handleDataSource(children, { level: level + 1, parentOpened: opened });
                });
            };

            handleDataSource(paginationDatasource || []);
        } else {
            showDataSource = paginationDatasource || [];
            totalDataSource = paginationDatasource || [];
        }

        return { totalDataSource, showDataSource, dataSourceLevelMap, totalRowKeys };
    }, [paginationDatasource, expandedRowKeys]);

    if (expandable) {
        const renderItem = (item: T) => {
            const key = (typeof rowKey === 'function' ? rowKey(item) : item[rowKey]) as string;
            const children = (item as any)[childrenColumnName];
            const haveChild = Array.isArray(children) && children.length > 0;
            if (haveChild) {
                const onChange = (c: boolean) => {
                    const nextRowKeysObj = { ...expandedKeysObj };
                    if (c) {
                        nextRowKeysObj[key] = true;
                    } else {
                        delete nextRowKeysObj[key];
                    }
                    setExpandedRowKeys(Object.keys(nextRowKeysObj));
                };

                return <ExpandableFC expanded={expandedKeysObj[key]} onChange={onChange} />;
            }
            return <div />;
        };

        expandableColumns.push({
            width,
            fixed,
            flexGrow: 0,
            resize: false,
            title: <div />,
            align: 'center',
            render: renderItem,
            key: 'table-row-expandable',
        });
    }

    timeDebug.end('useExpandable');

    return { totalDataSource, showDataSource, totalRowKeys, dataSourceLevelMap, expandableColumns, expandedRowKeys, setExpandedRowKeys };
};

export type Expandable<T> = ReturnType<typeof useExpandable<T>>;
export default useExpandable;
