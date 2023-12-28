/* eslint-disable @typescript-eslint/no-shadow */
import { HandledProps } from '../useHandleProps';
import { useMemo, useState } from 'react';
import { TableColumn } from '../../type';
import ExpandableFC from './Expandable';

type Opt<T> = {
    sizedDataSource: T[];
    handledProps: HandledProps<T>;
};

const useExpandable = <T,>(opt: Opt<T>) => {
    const { handledProps, sizedDataSource } = opt;
    const { rowKey, expandable } = handledProps;

    const expandableColumns: TableColumn<T>[] = [];
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

    const { totalDataSource, showDataSource, dataSourceLevelMap } = useMemo(() => {
        let showDataSource: T[] = [];
        let totalDataSource: T[] = [];
        const dataSourceLevelMap: Record<string, number> = {};

        if (expandable) {
            const handleDataSource = (value: T[], opt?: { level: number; parentOpened: boolean }) => {
                value.forEach((item) => {
                    const key = item[rowKey] as string;
                    const opened = expandedKeysObj[key] ?? false;
                    const children = (item as any)[childrenColumnName];
                    const { level = 0, parentOpened = true } = opt || {};
                    const haveChild = Array.isArray(children) && children.length > 0;

                    totalDataSource.push(item);
                    if (parentOpened) showDataSource.push(item);
                    if (parentOpened && level !== 0) dataSourceLevelMap[key] = level;
                    if (haveChild) handleDataSource(children, { level: level + 1, parentOpened: opened });
                });
            };

            handleDataSource(sizedDataSource || []);
        } else {
            showDataSource = sizedDataSource || [];
            totalDataSource = sizedDataSource || [];
        }

        return { totalDataSource, showDataSource, dataSourceLevelMap };
    }, [sizedDataSource, expandedRowKeys]);

    if (expandable) {
        const renderItem = (item: T) => {
            const key = item[rowKey] as string;
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

    return { totalDataSource, showDataSource, dataSourceLevelMap, expandableColumns };
};

export default useExpandable;
