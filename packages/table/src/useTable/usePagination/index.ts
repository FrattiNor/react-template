import { useEffect, useMemo, useState } from 'react';
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
    const havePagination = !!pagination;
    const dataSourceLength = (dataSource || []).length;
    const total = typeof pagination !== 'boolean' ? pagination?.total ?? dataSourceLength : dataSourceLength;
    const current = typeof pagination !== 'boolean' ? pagination?.current ?? _current : _current;
    const pageSize = typeof pagination !== 'boolean' ? pagination?.pageSize ?? _pageSize : _pageSize;
    const onChange = typeof pagination !== 'boolean' ? pagination?.onChange ?? _onChange : _onChange;

    // 数据源变更回到第一页
    useEffect(() => {
        _setCurrent(1);
    }, [dataSource]);

    const sizedDataSource = useMemo(() => {
        if (pagination) {
            if (typeof pagination !== 'boolean' && typeof pagination?.total === 'number') {
                return dataSource || [];
            } else {
                return (dataSource || []).slice(pageSize * (current - 1), pageSize * current);
            }
        }

        return dataSource || [];
    }, [dataSource, current, pageSize, havePagination]);

    const handledPagination = pagination
        ? {
              ...(typeof pagination !== 'boolean' ? pagination : {}),
              total,
              current,
              pageSize,
              onChange,
          }
        : (false as const);

    return {
        sizedDataSource,
        pagination: handledPagination,
    };
};

export default usePagination;
