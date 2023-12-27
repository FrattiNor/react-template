/* eslint-disable @typescript-eslint/no-shadow */
import { HandledProps } from '../useHandleProps';
import { useMemo, useState } from 'react';
import ExpandableFC from './Expandable';
import { Column } from '../../type';

type Opt<T> = {
    handledProps: HandledProps<T>;
};

const useExpandable = <T,>(opt: Opt<T>) => {
    const { handledProps } = opt;
    const { rowKey, expandable, dataSource } = handledProps;

    const expandableColumns: Column<T>[] = [];
    const [_expandedRowKeys, _setExpandedRowKeys] = useState<string[]>([]);
    const expandedRowKeys = expandable?.expandedRowKeys ?? _expandedRowKeys;
    const setExpandedRowKeys = expandable?.onChange ?? _setExpandedRowKeys;

    let calcObj = false;
    const expandedKeysObj: Record<string, boolean> = {};
    const childrenColumnName = expandable?.childrenColumnName ?? 'children';

    const { totalDataSource, showDataSource, dataSourceLevelMap } = useMemo(() => {
        let showDataSource: T[] = [];
        let totalDataSource: T[] = [];
        const dataSourceLevelMap: Record<string, number> = {};

        if (expandable) {
            if (calcObj === false) {
                calcObj = true;
                expandedRowKeys.forEach((key) => {
                    expandedKeysObj[key] = true;
                });
            }

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

            handleDataSource(dataSource || []);
        } else {
            showDataSource = dataSource || [];
            totalDataSource = dataSource || [];
        }

        return { totalDataSource, showDataSource, dataSourceLevelMap };
    }, [dataSource, expandedRowKeys]);

    if (expandable) {
        const { fixed = 'left', width = 33 } = expandable;

        if (calcObj === false) {
            calcObj = true;
            expandedRowKeys.forEach((key) => {
                expandedKeysObj[key] = true;
            });
        }

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
            hiddenDivider: true,
            key: 'table-row-expandable',
        });
    }

    return { totalDataSource, showDataSource, dataSourceLevelMap, expandableColumns };
};

export default useExpandable;
