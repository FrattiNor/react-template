import { useEffect } from 'react';

import type { DataSource } from '../useDataSource';
import type { Expandable } from '../useExpandable';
import type { HandledProps } from '../useHandleProps';
import type { RowSelection } from '../useRowSelection';

type Opt<T> = {
    dataSource: DataSource<T>;
    expandable: Expandable<T>;
    rowSelection: RowSelection<T>;
    handledProps: HandledProps<T>;
};

const useClearRowSelectionAndExpandable = <T>(opt: Opt<T>) => {
    const { dataSource, expandable, rowSelection, handledProps } = opt;

    const { rowKey } = handledProps;
    const { setExpandedRowKeys } = expandable;
    const { setSelectedRowKeys } = rowSelection;
    const { paginationDatasource, totalDataSource } = dataSource;

    // 数据源变更
    useEffect(() => {
        if (paginationDatasource) {
            const sameDelete = (prevKeys: string[]) => {
                if (totalDataSource.length !== 0) {
                    // prev
                    const prevRowKeysObj: Record<string, true> = {};
                    prevKeys.forEach((key) => (prevRowKeysObj[key] = true));
                    // next
                    let haveNotSame = false; // 是否有不同
                    const nextKeys: string[] = [];
                    (totalDataSource || []).forEach((item) => {
                        const key = (typeof rowKey === 'function' ? rowKey(item) : item[rowKey]) as string;
                        if (prevRowKeysObj[key]) {
                            nextKeys.push(key);
                        } else {
                            haveNotSame = true;
                        }
                    });
                    return haveNotSame ? nextKeys : prevKeys;
                } else {
                    return prevKeys.length === 0 ? prevKeys : [];
                }
            };
            // 分页信息改变，删除不在数据源中的选中项
            setSelectedRowKeys(sameDelete);
            // 分页信息改变，删除不在数据源中的展开项
            setExpandedRowKeys(sameDelete);
        } else {
            // 不存在数据源，清空选中项
            setSelectedRowKeys((prevKeys) => (prevKeys.length === 0 ? prevKeys : []));
            // 不存在数据源，清空展开项
            setExpandedRowKeys((prevKeys) => (prevKeys.length === 0 ? prevKeys : []));
        }
    }, [paginationDatasource]);
};

export default useClearRowSelectionAndExpandable;
