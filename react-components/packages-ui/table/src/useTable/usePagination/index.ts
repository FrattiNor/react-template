import { useEffect, useState } from 'react';

import { HandledProps } from '../useHandleProps';

type Opt<T> = {
    handledProps: HandledProps<T>;
};

const usePagination = <T>(opt: Opt<T>) => {
    const { handledProps } = opt;

    const [_current, _setCurrent] = useState(1);
    const [_pageSize, _setPageSize] = useState(10);
    const _onChange = (c: number, p: number) => {
        _setCurrent(c);
        _setPageSize(p);
    };

    const { pagination, dataSource } = handledProps;
    const dataSourceLength = (dataSource || []).length;
    const localPagination = typeof pagination !== 'boolean' ? !pagination?.total : pagination; // 是否本地分页
    const total = typeof pagination !== 'boolean' ? pagination?.total ?? dataSourceLength : dataSourceLength; // total值
    const current = !pagination ? 1 : typeof pagination !== 'boolean' ? pagination?.current ?? _current : _current; // 当前页
    const pageSize = typeof pagination !== 'boolean' ? pagination?.pageSize ?? _pageSize : _pageSize; // 每页数量
    const onChange = typeof pagination !== 'boolean' ? pagination?.onChange ?? _onChange : _onChange; // 变更回调

    // 数据源变更回到第一页
    useEffect(() => {
        _setCurrent(1);
    }, [dataSource]);

    const ref = pagination
        ? {
              ...(typeof pagination !== 'boolean' ? pagination : {}),
              total,
              current,
              pageSize,
              onChange,
              localPagination,
          }
        : (false as const);

    return ref;
};

export type Pagination = ReturnType<typeof usePagination>;
export default usePagination;
