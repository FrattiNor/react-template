import { Column, Expandable } from '../../type';
import { Fragment, useMemo, useState } from 'react';
import ExpandableFC from './Expandable';

type Opt<T> = {
    rowKey: keyof T;
    dataSource?: T[];
    expandable?: Expandable;
};

const useExpandable = <T,>(opt: Opt<T>) => {
    const { rowKey, expandable, dataSource } = opt;

    const expandableColumns: Column<T>[] = [];

    const [expandedKeyObj, setExpandedKeyObj] = useState<Record<string, boolean>>({});

    const totalDataSource = useMemo(() => {
        if (expandable) {
            const { defaultExpandAllRows, childrenColumnName = 'children' } = expandable;

            const handleDataSource = (value: T[], index = 0) => {
                const res: T[] = [];

                value.forEach((item) => {
                    res.push(item);
                    const key = item[rowKey] as string;
                    const children = (item as any)[childrenColumnName];
                    const opened = expandedKeyObj[key] ?? defaultExpandAllRows;
                    const haveChild = Array.isArray(children) && children.length > 0;
                    if (opened && haveChild) {
                        res.push(...handleDataSource(children, index + 1));
                    }
                });

                return res;
            };

            const res = handleDataSource(dataSource || []);

            return res;
        }

        return dataSource || [];
    }, [expandedKeyObj, dataSource]);

    if (expandable) {
        const { defaultExpandAllRows, childrenColumnName = 'children' } = expandable;

        expandableColumns.push({
            width: 33,
            flexGrow: 0,
            fixed: 'left',
            resize: false,
            align: 'center',
            title: <Fragment />,
            hiddenDivider: true,
            key: 'table-row-expandable',
            render: (item) => {
                const key = item[rowKey] as string;
                const children = (item as any)[childrenColumnName];
                const haveChild = Array.isArray(children) && children.length > 0;
                if (haveChild) {
                    const onChange = (c: boolean) => setExpandedKeyObj((old) => ({ ...old, [key]: c }));
                    return <ExpandableFC expanded={expandedKeyObj[key] ?? defaultExpandAllRows} onChange={onChange} />;
                }
                return <Fragment />;
            },
        });
    }

    return { totalDataSource, expandableColumns };
};

export default useExpandable;
