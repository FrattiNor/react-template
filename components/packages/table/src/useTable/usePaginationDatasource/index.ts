import { HandledProps } from '../useHandleProps';
import { Pagination } from '../usePagination';
import { useMemo } from 'react';

type Opt<T> = {
    pagination: Pagination;
    handledProps: HandledProps<T>;
};

const usePaginationDatasource = <T>(opt: Opt<T>) => {
    const { handledProps, pagination } = opt;
    const { dataSource } = handledProps;
    const havePagination = !!pagination;
    const current = !pagination ? 1 : pagination?.current;
    const pageSize = !pagination ? 10 : pagination?.pageSize;

    return useMemo(() => {
        if (pagination) {
            if (typeof pagination !== 'boolean' && typeof pagination?.total === 'number') {
                return dataSource || [];
            } else {
                return (dataSource || []).slice(pageSize * (current - 1), pageSize * current);
            }
        }

        return dataSource || [];
    }, [dataSource, current, pageSize, havePagination]);
};

export default usePaginationDatasource;
