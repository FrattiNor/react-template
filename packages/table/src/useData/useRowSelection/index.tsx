import { Column, RowSelection } from '../../type';
import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';

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

    const dataSourceSelectedRowKeysObj: Record<string, true> = {};

    const rowSelectionColumns: Column<T>[] = [];

    if (rowSelection) {
        let checkedAll = true;
        let checkedSome = false;

        const allRowKeys: (string | number)[] = [];
        const selectedRowKeysObj: Record<string, true> = {};

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
            <Checkbox checked={checkedAll} indeterminate={!checkedAll && checkedSome} onChange={(c) => setSelectedRowKeys(c ? allRowKeys : [])} />
        );

        rowSelectionColumns.push({
            title,
            flexGrow: 0,
            fixed: 'left',
            resize: false,
            align: 'center',
            key: 'row-selection',
            width: rowSelection.width ?? 50,
            render: (item) => {
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
            },
        });
    }

    // 删除不存在的选中项
    useEffect(() => {
        if (rowSelection) {
            setSelectedRowKeys(Object.keys(dataSourceSelectedRowKeysObj));
        }
    }, [dataSource]);

    return {
        selectedRowKeysObj: dataSourceSelectedRowKeysObj,
        rowSelectionColumns,
    };
};

export default useRowSelection;
