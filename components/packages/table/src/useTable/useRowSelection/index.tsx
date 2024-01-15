/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useMemo, useState } from 'react';
import { HandledProps } from '../useHandleProps';
import { TableColumns } from '../../type';
import Checkbox from '@pkg/checkbox';

type setKeys = (v: (string | number)[]) => void;

type Opt<T> = {
    totalDataSource?: T[];
    handledProps: HandledProps<T>;
};

// 分页多选 存在Bug
const useRowSelection = <T,>(opt: Opt<T>) => {
    const { handledProps, totalDataSource } = opt;

    const { rowSelection, rowKey } = handledProps;
    const rowSelectionColumns: TableColumns<T> = [];
    const selectedRowKeysObj: Record<string, true> = {};
    const titleKey = useMemo(() => `${new Date().valueOf()}`, [totalDataSource]);
    const [_selectedRowKeys, _setSelectedRowKeys] = useState<string[]>([]);
    const width = typeof rowSelection !== 'boolean' ? rowSelection?.width ?? 42 : 42;
    const fixed = typeof rowSelection !== 'boolean' ? rowSelection?.fixed ?? 'left' : 'left';
    const getCheckboxProps = typeof rowSelection !== 'boolean' ? rowSelection?.getCheckboxProps : undefined;
    const selectedRowKeys = typeof rowSelection !== 'boolean' ? rowSelection?.selectedRowKeys ?? _selectedRowKeys : _selectedRowKeys;
    const setSelectedRowKeys = (typeof rowSelection !== 'boolean' ? rowSelection?.onChange ?? _setSelectedRowKeys : _setSelectedRowKeys) as setKeys;

    // 数据源变更，清掉不在当前数据源中的数据
    useEffect(() => {
        const dataSourceSelectedRowKeysObj: Record<string, true> = {};

        (totalDataSource || []).forEach((item) => {
            const key = (typeof rowKey === 'function' ? rowKey(item) : item[rowKey]) as string;
            if (selectedRowKeysObj[key]) {
                dataSourceSelectedRowKeysObj[key] = true;
            }
        });

        setSelectedRowKeys(Object.keys(dataSourceSelectedRowKeysObj));
    }, [totalDataSource]);

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
            (totalDataSource || []).forEach((item) => {
                let disabled = false;
                const key = (typeof rowKey === 'function' ? rowKey(item) : item[rowKey]) as string;
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
        const titleDisabled = allCouldCheckRowKeys.length === 0;
        const titleChecked = !titleDisabled && allCouldCheckRowKeys.length === allDatasourceCheckedRowKeys.length;
        const titleIndeterminate = !titleChecked && allDatasourceCheckedRowKeys.length > 0;

        const title = (
            <Checkbox
                key={titleKey}
                checked={titleChecked}
                disabled={titleDisabled}
                onClick={(e) => e.stopPropagation()}
                indeterminate={titleIndeterminate}
                onChange={(c) => {
                    setSelectedRowKeys(c ? allCouldCheckRowKeys : []);
                }}
            />
        );

        const renderItem = (item: T) => {
            const key = (typeof rowKey === 'function' ? rowKey(item) : item[rowKey]) as string;

            const checked = selectedRowKeysObj[key];

            const checkboxProps = getCheckboxProps ? getCheckboxProps(item) : {};

            const onChange = (c: boolean) => {
                const dataSourceSelectedRowKeysObj: Record<string, true> = {};

                (totalDataSource || []).forEach((item) => {
                    const key = (typeof rowKey === 'function' ? rowKey(item) : item[rowKey]) as string;
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

            return <Checkbox checked={checked} onChange={onChange} onClick={(e) => e.stopPropagation()} {...checkboxProps} />;
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
        selectedRowKeys,
        setSelectedRowKeys,
        selectedRowKeysObj,
        rowSelectionColumns,
    };
};

export default useRowSelection;
