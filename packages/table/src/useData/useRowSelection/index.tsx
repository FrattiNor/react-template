/* eslint-disable @typescript-eslint/no-shadow */
import { HandledProps } from '../useHandleProps';
import { useMemo, useState } from 'react';
import { Column } from '../../type';
import Checkbox from './Checkbox';

type Opt<T> = {
    totalDataSource?: T[];
    handledProps: HandledProps<T>;
};

const useRowSelection = <T,>(opt: Opt<T>) => {
    const { handledProps, totalDataSource } = opt;
    const { rowSelection, rowKey } = handledProps;
    const [_selectedRowKeys, _setSelectedRowKeys] = useState([]);
    const selectedRowKeys = rowSelection?.selectedRowKeys ?? _selectedRowKeys;
    const setSelectedRowKeys = (rowSelection?.onChange ?? _setSelectedRowKeys) as (v: (string | number)[]) => void;

    const rowSelectionColumns: Column<T>[] = [];
    const selectedRowKeysObj: Record<string, true> = {};

    //
    if (rowSelection) {
        selectedRowKeys.forEach((key) => {
            selectedRowKeysObj[key] = true;
        });
    }

    //
    const { allCouldCheckRowKeys, allDatasourceCheckedRowKeys } = useMemo(() => {
        const allCouldCheckRowKeys: (string | number)[] = [];
        const allDatasourceCheckedRowKeys: (string | number)[] = [];

        if (rowSelection) {
            const { getCheckboxProps } = rowSelection;

            (totalDataSource || []).forEach((item) => {
                let disabled = false;
                const key = item[rowKey] as string;
                if (getCheckboxProps) {
                    disabled = getCheckboxProps(item)?.disabled;
                }
                if (disabled !== true) {
                    allCouldCheckRowKeys.push(key);
                    if (selectedRowKeysObj[key]) {
                        allDatasourceCheckedRowKeys.push(key);
                    }
                }
            });
        }

        return { allCouldCheckRowKeys, allDatasourceCheckedRowKeys };
    }, [rowSelection, selectedRowKeys, totalDataSource]);

    //
    if (rowSelection) {
        const { width = 42, fixed = 'left', getCheckboxProps } = rowSelection;

        const titleDisabled = allCouldCheckRowKeys.length === 0;
        const titleChecked = !titleDisabled && allCouldCheckRowKeys.length === allDatasourceCheckedRowKeys.length;
        const titleIndeterminate = !titleChecked && allDatasourceCheckedRowKeys.length > 0;

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

        const renderItem = (item: T) => {
            const key = item[rowKey] as any;

            const checked = selectedRowKeysObj[key];

            const checkboxProps = getCheckboxProps ? getCheckboxProps(item) : {};

            const onChange = (c: boolean) => {
                const dataSourceSelectedRowKeysObj: Record<string, true> = {};

                (totalDataSource || []).forEach((item) => {
                    const key = item[rowKey] as string;
                    if (selectedRowKeysObj[key]) {
                        dataSourceSelectedRowKeysObj[key] = true;
                    }
                });

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
    };
};

export default useRowSelection;
