import { HandledProps } from '../useHandleProps';
import { Fragment, useState } from 'react';
import ExpandableFC from './Expandable';
import { Column } from '../../type';

type Opt<T> = {
    handledProps: HandledProps<T>;
};

const useExpandable = <T,>(opt: Opt<T>) => {
    const { handledProps } = opt;
    const { rowKey, expandable, dataSource } = handledProps.outerProps;

    const expandableColumns: Column<T>[] = [];
    const defaultExpandAllRows = expandable?.defaultExpandAllRows ?? false;
    const [_expandedRowKeys, _setExpandedRowKeys] = useState<boolean | string[]>(defaultExpandAllRows);
    const expandedRowKeys = expandable?.expandedRowKeys ?? _expandedRowKeys;
    const setExpandedRowKeys = expandable?.onChange ?? _setExpandedRowKeys;

    const childrenColumnName = expandable?.childrenColumnName ?? 'children';

    let showDataSource: T[] = dataSource || [];
    let totalDataSource: T[] = dataSource || [];

    if (expandable) {
        const { fixed = 'left', width = 33 } = expandable;

        // 由expandedRowKeys为数组时生成
        const expandedKeysObj: Record<string, boolean> = {};
        // 有expandedRowKeys为boolean时生成【也就是defaultExpandAllRows时】
        const trueExpandedKeysObj: Record<string, boolean> = {};

        if (Array.isArray(expandedRowKeys)) {
            expandedRowKeys.forEach((key) => {
                expandedKeysObj[key] = true;
            });
        }

        // const handleDataSource = (value: T[], xIndex = 0) => {
        //     const show: T[] = [];
        //     const total: T[] = [];

        //     value.forEach((item) => {
        //         show.push({ ...item, xIndex });
        //         total.push({ ...item, xIndex });
        //         const key = item[rowKey] as string;
        //         const children = (item as any)[childrenColumnName];
        //         const haveChild = Array.isArray(children) && children.length > 0;

        //         if (haveChild) {
        //             const opened = expandedKeysObj[key] ?? _expandedRowKeys === true;
        //             const childrenRes = handleDataSource(children, xIndex + 1);
        //             total.push(...childrenRes.total);
        //             if (opened) {
        //                 trueExpandedKeysObj[key] = true;
        //                 show.push(...childrenRes.show);
        //             }
        //         }
        //     });

        //     return { total, show };
        // };

        // const { total, show } = handleDataSource(dataSource || []);

        // showDataSource = show;

        // totalDataSource = total;

        const renderItem = (item: T) => {
            const key = item[rowKey] as string;
            const children = (item as any)[childrenColumnName];
            const haveChild = Array.isArray(children) && children.length > 0;
            if (haveChild) {
                const onChange = (c: boolean) => {
                    const nextRowKeysObj = { ...trueExpandedKeysObj };
                    if (c) {
                        nextRowKeysObj[key] = true;
                    } else {
                        delete nextRowKeysObj[key];
                    }
                    setExpandedRowKeys(Object.keys(nextRowKeysObj));
                };

                return <ExpandableFC expanded={trueExpandedKeysObj[key]} onChange={onChange} />;
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
