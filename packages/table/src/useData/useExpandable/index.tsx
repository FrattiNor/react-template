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

    const { total: totalDataSource, show: showDataSource } = useMemo(() => {
        if (expandable) {
            const { defaultExpandAllRows, childrenColumnName = 'children' } = expandable;

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
                        const opened = expandedKeyObj[key] ?? defaultExpandAllRows;
                        const childrenRes = handleDataSource(children, xIndex + 1);
                        total.push(...childrenRes.total);
                        if (opened) show.push(...childrenRes.show);
                    }
                });

                return { total, show };
            };

            return handleDataSource(dataSource || []);
        }

        return { total: dataSource || [], show: dataSource || [] };
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

    return { totalDataSource, showDataSource, expandableColumns };
};

export default useExpandable;
