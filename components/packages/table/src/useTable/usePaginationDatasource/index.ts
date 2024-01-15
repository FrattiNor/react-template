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
    const localPagination = !pagination ? false : pagination.localPagination;

    const res = useMemo(() => {
        if (havePagination) {
            if (!localPagination) {
                return dataSource || [];
            } else {
                return (dataSource || []).slice(pageSize * (current - 1), pageSize * current);
            }
        }

        return dataSource || [];
    }, [dataSource, current, pageSize, localPagination, havePagination]);

    return res;
};

export default usePaginationDatasource;
