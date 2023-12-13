import { Column, RowSelection } from '../../type';
import Checkbox from './Checkbox';
import { useState } from 'react';

type Opt<T> = {
    rowKey: keyof T;
    dataSource?: T[];
    rowSelection?: RowSelection<T>;
};

const useRowSelection = <T,>(opt: Opt<T>) => {
    const { rowKey, dataSource, rowSelection } = opt;
    const [_selectedRowKeys, _setSelectedRowKeys] = useState([]);
    const selectedRowKeys = rowSelection?.selectedRowKeys ?? _selectedRowKeys;
    const setSelectedRowKeys = (rowSelection?.onChange ?? _setSelectedRowKeys) as (v: (string | number)[]) => void;

    const rowSelectionColumns: Column<T>[] = [];
    const selectedRowKeysObj: Record<string, true> = {};
    const dataSourceSelectedRowKeysObj: Record<string, true> = {};

    if (rowSelection) {
        const { width = 50, fixed = 'left', getCheckboxProps } = rowSelection;

        const allCouldCheckRowKeys: (string | number)[] = [];
        const allCouldCheckedRowKeys: (string | number)[] = [];

        selectedRowKeys.forEach((key) => {
            selectedRowKeysObj[key] = true;
        });

        (dataSource || []).forEach((item, index) => {
            let disabled = false;
            const key = item[rowKey] as string;
            if (getCheckboxProps) {
                disabled = getCheckboxProps(item, index).disabled;
            }
            if (selectedRowKeysObj[key]) {
                dataSourceSelectedRowKeysObj[key] = true;
            }
            if (disabled !== true) {
                allCouldCheckRowKeys.push(key);
                if (selectedRowKeysObj[key]) {
                    allCouldCheckedRowKeys.push(key);
                }
            }
        });

        const titleDisabled = allCouldCheckRowKeys.length === 0;
        const titleChecked = !titleDisabled && allCouldCheckRowKeys.length === allCouldCheckedRowKeys.length;
        const titleIndeterminate = !titleChecked && allCouldCheckedRowKeys.length > 0;

        const title = (
            <Checkbox
                checked={titleChecked}
                disabled={titleDisabled}
                indeterminate={titleIndeterminate}
                onChange={(c) => {
                    setSelectedRowKeys(c ? allCouldCheckRowKeys : []);
                }}
            />
        );

        const renderItem = (item: T, index: number) => {
            const key = item[rowKey] as any;

            const checked = selectedRowKeysObj[key];

            const checkboxProps = getCheckboxProps ? getCheckboxProps(item, index) : {};

            const onChange = (c: boolean) => {
                const nextRowKeysObj = { ...dataSourceSelectedRowKeysObj };
                if (c) {
                    nextRowKeysObj[key] = true;
                } else {
                    delete nextRowKeysObj[key];
                }
                setSelectedRowKeys(Object.keys(nextRowKeysObj));
            };

            return <Checkbox checked={checked} onChange={onChange} {...checkboxProps} />;
        };

        rowSelectionColumns.push({
            title,
            fixed,
            width,
            flexGrow: 0,
            resize: false,
            align: 'center',
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
