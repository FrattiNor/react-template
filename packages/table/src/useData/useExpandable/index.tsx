import { Column, Expandable } from '../../type';
import { Fragment, useEffect, useRef, useState } from 'react';
import ExpandableFC from './Expandable';

type Opt<T> = {
    rowKey: keyof T;
    dataSource?: T[];
    expandable?: Expandable;
};

const useExpandable = <T,>(opt: Opt<T>) => {
    const defaultExpandAllHandled = useRef(false);
    const { rowKey, expandable, dataSource } = opt;

    const expandableColumns: Column<T>[] = [];
    const [_expandedRowKeys, _setExpandedRowKeys] = useState<string[]>([]);
    const expandedRowKeys = expandable?.expandedRowKeys ?? _expandedRowKeys;
    const setExpandedRowKeys = expandable?.onChange ?? _setExpandedRowKeys;
    const defaultExpandAllRows = expandable?.defaultExpandAllRows ?? false;
    const childrenColumnName = expandable?.childrenColumnName ?? 'children';

    useEffect(() => {
        if (defaultExpandAllHandled.current === false && defaultExpandAllRows === true && Array.isArray(dataSource) && dataSource.length > 0) {
            defaultExpandAllHandled.current = true;

            const handleDataSource = (value: T[]) => {
                const allKeys: string[] = [];

                value.forEach((item) => {
                    const key = item[rowKey] as string;
                    const children = (item as any)[childrenColumnName];
                    const haveChild = Array.isArray(children) && children.length > 0;

                    if (haveChild) {
                        allKeys.push(key);
                        allKeys.push(...handleDataSource(children));
                    }
                });

                return allKeys;
            };

            setExpandedRowKeys(handleDataSource(dataSource));
        }
    }, [defaultExpandAllRows, dataSource]);

    let showDataSource: T[] = dataSource || [];
    let totalDataSource: T[] = dataSource || [];

    if (expandable) {
        const { fixed = 'left', width = 33 } = expandable;

        const expandedKeysObj: Record<string, boolean> = {};

        expandedRowKeys.forEach((key) => {
            expandedKeysObj[key] = true;
        });

        const handleDataSource = (value: T[], xIndex = 0) => {
            const show: T[] = [];
            const total: T[] = [];

            value.forEach((item) => {
                show.push({ ...item, xIndex });
                total.push({ ...item, xIndex });
                const key = item[rowKey] as string;
                const children = (item as any)[childrenColumnName];
                const haveChild = Array.isArray(children) && children.length > 0;

                if (haveChild) {
                    const opened = expandedKeysObj[key];
                    const childrenRes = handleDataSource(children, xIndex + 1);
                    total.push(...childrenRes.total);
                    if (opened) show.push(...childrenRes.show);
                }
            });

            return { total, show };
        };

        const { total, show } = handleDataSource(dataSource || []);

        showDataSource = show;

        totalDataSource = total;

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
            return <Fragment />;
        };

        expandableColumns.push({
            width,
            fixed,
            flexGrow: 0,
            resize: false,
            align: 'center',
            render: renderItem,
            title: <Fragment />,
            hiddenDivider: true,
            key: 'table-row-expandable',
        });
    }

    return { totalDataSource, showDataSource, expandableColumns };
};

export default useExpandable;
