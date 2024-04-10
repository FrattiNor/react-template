import { useState } from 'react';

import { useEffectNotFirst } from '@react/hooks';

import type { HandledProps } from '../useHandleProps';

const usePagination = <T>(handledProps: HandledProps<T>) => {
    // 本地参数
    const [_current, _setCurrent] = useState(1);
    const [_pageSize, _setPageSize] = useState(10);
    // onChange
    const _onChange = (c: number, p: number) => {
        _setCurrent(c);
        _setPageSize(p);
    };

    const { pagination, dataSource } = handledProps;
    const localPagination = !(pagination && (pagination.total || pagination.total === 0)); // 是否本地分页
    const total = Number(pagination?.total ?? (dataSource ?? []).length); // total值
    const current = pagination?.current ?? _current; // 当前页
    const pageSize = pagination?.pageSize ?? _pageSize; // 每页数量
    const onChange = pagination?.onChange ?? _onChange; // 变更回调

    // 数据源变更回到第一页
    useEffectNotFirst(() => {
        if (localPagination) _setCurrent(1);
    }, [dataSource]);

    const res = pagination && {
        ...(typeof pagination !== 'boolean' ? pagination : {}),
        total,
        current,
        pageSize,
        onChange,
        localPagination,
    };

    return res;
};

export type Pagination = ReturnType<typeof usePagination>;
export default usePagination;
