import { HandledProps } from '../useHandleProps';
import { useMemo, useState } from 'react';

type Opt<T> = {
    handledProps: HandledProps<T>;
};

const usePagination = <T>(opt: Opt<T>) => {
    const { handledProps } = opt;
    const [_current, _setCurrent] = useState(1);
    const [_pageSize, _setPageSize] = useState(10);
    const { pagination, dataSource } = handledProps;

    const dataSourceLength = (dataSource || []).length;
    const total = pagination ? pagination.total ?? dataSourceLength : dataSourceLength;
    const current = pagination ? pagination.current ?? _current : _current;
    const pageSize = pagination ? pagination.pageSize ?? _pageSize : _pageSize;
    const onChange = pagination
        ? pagination.onChange
        : (c: number, p: number) => {
              _setCurrent(c);
              _setPageSize(p);
          };

    const sizedDataSource = useMemo(() => {
        if (pagination === false) {
            return dataSource || [];
        } else if (typeof pagination?.total === 'number') {
            return dataSource || [];
        } else {
            return (dataSource || []).slice(pageSize * (current - 1), pageSize * current);
        }
    }, [dataSource, current, pageSize]);

    const handledPagination =
        pagination === false
            ? (false as const)
            : {
                  ...pagination,
                  total,
                  current,
                  pageSize,
                  onChange,
              };

    return {
        sizedDataSource,
        pagination: handledPagination,
    };
};

export default usePagination;
