import { useMemo } from 'react';

import { useMergeState } from '@react/hooks';
import { Checkbox } from 'antd';

import type { TableColumn } from '../../type';
import type { DataSource } from '../useDataSource';
import type { HandledProps } from '../useHandleProps';

type Opt<T> = {
    handledProps: HandledProps<T>;
    dataSource: DataSource<T>;
};

export const tableRowSelectionKey = 'table-row-selection';

const useRowSelection = <T,>(opt: Opt<T>) => {
    const { handledProps, dataSource } = opt;
    const { totalDataSource } = dataSource;
    const { rowSelection, rowKey } = handledProps;

    const [selectedRowKeys, setSelectedRowKeys] = useMergeState({
        defaultValue: [],
        state: rowSelection?.selectedRowKeys,
        setState: rowSelection?.onSelectedRowKeysChange,
    });

    // 将str转换为obj，方便使用
    const selectedRowKeysObj = useMemo(() => {
        const obj: Record<string, boolean> = {};
        if (rowSelection) {
            selectedRowKeys.forEach((key) => {
                obj[key] = true;
            });
        }
        return obj;
    }, [selectedRowKeys]);

    // 获取能够选择
    const { allCouldCheckRowKeys, allDatasourceCheckedRowKeys } = useMemo(() => {
        const allCouldCheckRowKeys: string[] = [];
        const allDatasourceCheckedRowKeys: string[] = [];
        const getCheckboxProps = rowSelection?.getCheckboxProps ?? undefined;

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
    }, [!!rowSelection, selectedRowKeys, totalDataSource]);

    const rowSelectionColumn = (() => {
        if (rowSelection) {
            const width = rowSelection?.width ?? 42;
            const getCheckboxProps = rowSelection?.getCheckboxProps ?? undefined;

            const titleDisabled = allCouldCheckRowKeys.length === 0;
            const titleChecked = !titleDisabled && allCouldCheckRowKeys.length === allDatasourceCheckedRowKeys.length;
            const titleIndeterminate = !titleChecked && allDatasourceCheckedRowKeys.length > 0;

            const title = (
                <Checkbox
                    checked={titleChecked}
                    disabled={titleDisabled}
                    onClick={(e) => e.stopPropagation()}
                    indeterminate={titleIndeterminate}
                    onChange={(e) => {
                        setSelectedRowKeys(e.target.checked ? allCouldCheckRowKeys : []);
                    }}
                />
            );

            const renderItem = (item: T) => {
                const key = (typeof rowKey === 'function' ? rowKey(item) : item[rowKey]) as string;

                const checked = selectedRowKeysObj[key];

                const checkboxProps = getCheckboxProps ? getCheckboxProps(item) : {};

                const onChange = (c: boolean) => {
                    const nextRowKeysObj = { ...selectedRowKeysObj };

                    if (c) {
                        nextRowKeysObj[key] = true;
                    } else {
                        delete nextRowKeysObj[key];
                    }

                    setSelectedRowKeys(Object.keys(nextRowKeysObj));
                };

                return (
                    <Checkbox
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        {...checkboxProps}
                    />
                );
            };

            const column: TableColumn<T> = {
                title,
                width,
                flexGrow: 0,
                fixed: 'left',
                resize: false,
                align: 'center',
                render: renderItem,
                key: tableRowSelectionKey,
            };

            return column;
        }

        return undefined;
    })();

    return {
        selectedRowKeys,
        setSelectedRowKeys,
        selectedRowKeysObj,
        rowSelectionColumn,
    };
};

export type RowSelection<T> = ReturnType<typeof useRowSelection<T>>;
export default useRowSelection;
