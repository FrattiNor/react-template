import { HandledProps } from '../useHandleProps';
import { useMemo, useState } from 'react';
import ExpandableFC from './Expandable';
import { Column } from '../../type';

type Opt<T> = {
    handledProps: HandledProps<T>;
};

const useExpandable = <T,>(opt: Opt<T>) => {
    const { handledProps } = opt;
    const { rowKey, expandable, dataSource } = handledProps.outerProps;

    const expandableColumns: Column<T>[] = [];
    const [_expandedRowKeys, _setExpandedRowKeys] = useState<string[]>([]);
    const expandedRowKeys = expandable?.expandedRowKeys ?? _expandedRowKeys;
    const setExpandedRowKeys = expandable?.onChange ?? _setExpandedRowKeys;

    let calcObj = false;
    const expandedKeysObj: Record<string, boolean> = {};
    const childrenColumnName = expandable?.childrenColumnName ?? 'children';

    const { totalDataSource, showDataSource } = useMemo(() => {
        if (calcObj === false) {
            calcObj = true;
            expandedRowKeys.forEach((key) => {
                expandedKeysObj[key] = true;
            });
        }

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

        return { totalDataSource: total, showDataSource: show };
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

    return { totalDataSource, showDataSource, expandableColumns };
};

export default useExpandable;
