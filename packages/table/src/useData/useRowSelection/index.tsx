import { Column, RowSelection } from '../../type';
import Checkbox from './Checkbox';
import { useState } from 'react';

type Opt<T> = {
    rowKey: keyof T;
    dataSource?: T[];

    rowSelection?: RowSelection;
};

const useRowSelection = <T,>(opt: Opt<T>) => {
    const [_selectedRowKeys, _setSelectedRowKeys] = useState([]);
    const { rowKey, dataSource, rowSelection } = opt;
    const selectedRowKeys = rowSelection?.selectedRowKeys ?? _selectedRowKeys;
    const setSelectedRowKeys = (rowSelection?.onChange ?? _setSelectedRowKeys) as (v: (string | number)[]) => void;

    const allRowKeys: (string | number)[] = [];
    const rowSelectionColumns: Column<T>[] = [];
    const selectedRowKeysObj: Record<string, true> = {};
    const dataSourceSelectedRowKeysObj: Record<string, true> = {};

    if (rowSelection) {
        const { width, fixed } = rowSelection;

        let checkedAll = true;
        let checkedSome = false;

        selectedRowKeys.forEach((key) => {
            selectedRowKeysObj[key] = true;
        });

        (dataSource || []).forEach((item) => {
            const key = item[rowKey] as string;
            allRowKeys.push(key);
            if (selectedRowKeysObj[key]) {
                checkedSome = true;
                dataSourceSelectedRowKeysObj[key] = true;
            } else {
                checkedAll = false;
            }
        });

        const title = (
            <Checkbox
                checked={checkedAll}
                indeterminate={!checkedAll && checkedSome}
                onChange={(c) => {
                    setSelectedRowKeys(c ? allRowKeys : []);
                }}
            />
        );

        const renderItem = (item: T) => {
            const key = item[rowKey] as any;

            const checked = selectedRowKeysObj[key];

            const onChange = (c: boolean) => {
                const nextRowKeysObj = { ...dataSourceSelectedRowKeysObj };
                if (c) {
                    nextRowKeysObj[key] = true;
                } else {
                    delete nextRowKeysObj[key];
                }
                setSelectedRowKeys(Object.keys(nextRowKeysObj));
            };

            return <Checkbox checked={checked} onChange={onChange} />;
        };

        rowSelectionColumns.push({
            title,
            fixed,
            flexGrow: 0,
            resize: false,
            align: 'center',
            width: width ?? 50,
            render: renderItem,
            key: 'table-row-selection',
        });
    }

    return {
        selectedRowKeysObj,
        rowSelectionColumns,
        dataSourceSelectedRowKeysObj,
    };
};

export default useRowSelection;
