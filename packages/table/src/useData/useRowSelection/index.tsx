import { Column, RowSelection } from '../../type';
import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';

type Opt<T> = {
    rowKey: keyof T;
    dataSource?: T[];
    columns: Column<T>[];
    rowSelection?: RowSelection;
};

const useRowSelection = <T,>(opt: Opt<T>) => {
    const [_rowKeys, _setRowKeys] = useState([]);
    const { columns, rowKey, dataSource, rowSelection } = opt;
    const rowKeys = rowSelection?.rowKeys ?? _rowKeys;
    const setRowKeys = (rowSelection?.onChange ?? _setRowKeys) as (v: (string | number)[]) => void;

    const rowSelectionColumns = [...columns];

    const dataSourceCheckedKeysObj: Record<string, true> = {};

    if (rowSelection) {
        let checkedAll = true;
        let checkedSome = false;

        const allKeys: (string | number)[] = [];
        const rowKeysObj: Record<string, true> = {};

        rowKeys.forEach((key) => {
            rowKeysObj[key] = true;
        });

        (dataSource || []).forEach((item) => {
            const key = item[rowKey] as string;
            allKeys.push(key);
            if (rowKeysObj[key]) {
                checkedSome = true;
                dataSourceCheckedKeysObj[key] = true;
            } else {
                checkedAll = false;
            }
        });

        const title = <Checkbox checked={checkedAll} indeterminate={!checkedAll && checkedSome} onChange={(c) => setRowKeys(c ? allKeys : [])} />;

        const rowSelectionColumn: Column<T> = {
            title,
            flexGrow: 0,
            fixed: 'left',
            align: 'center',
            key: 'row-selection',
            width: rowSelection.width ?? 50,
            render: (item) => {
                const key = item[rowKey] as any;
                const checked = rowKeysObj[key];
                const onChange = (c: boolean) => {
                    const nextRowKeysObj = { ...dataSourceCheckedKeysObj };
                    if (c) {
                        nextRowKeysObj[key] = true;
                    } else {
                        delete nextRowKeysObj[key];
                    }
                    setRowKeys(Object.keys(nextRowKeysObj));
                };
                return <Checkbox checked={checked} onChange={onChange} />;
            },
        };

        rowSelectionColumns.unshift(rowSelectionColumn);
    }

    // 删除不存在的选中项
    useEffect(() => {
        if (rowSelection) {
            setRowKeys(Object.keys(dataSourceCheckedKeysObj));
        }
    }, [dataSource]);

    return {
        rowKeysObj: dataSourceCheckedKeysObj,
        rowSelectionColumns,
    };
};

export default useRowSelection;
