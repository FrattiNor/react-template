import { HandledProps } from '../useHandleProps';
import { useEffect, useState } from 'react';

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
    const total = typeof pagination !== 'boolean' ? pagination?.total ?? dataSourceLength : dataSourceLength;
    const current = !pagination ? 1 : typeof pagination !== 'boolean' ? pagination?.current ?? _current : _current;
    const pageSize = typeof pagination !== 'boolean' ? pagination?.pageSize ?? _pageSize : _pageSize;
    const onChange = typeof pagination !== 'boolean' ? pagination?.onChange ?? _onChange : _onChange;

    // 数据源变更回到第一页
    useEffect(() => {
        _setCurrent(1);
    }, [dataSource]);

    return pagination
        ? {
              ...(typeof pagination !== 'boolean' ? pagination : {}),
              total,
              current,
              pageSize,
              onChange,
          }
        : (false as const);
};

export type Pagination = ReturnType<typeof usePagination>;
export default usePagination;
