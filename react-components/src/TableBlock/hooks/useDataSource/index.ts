import { useMemo } from 'react';

import { type TableBlockProps } from '../../../TableBlock/type';
import { type Pagination } from '../usePagination';

type Opt<T> = {
	props: TableBlockProps<T>;
	pagination: Pagination;
};

const useDataSource = <T>(opt: Opt<T>) => {
	const { props, pagination } = opt;
	const dataSource = props.dataSource;

	const havePagination = !!pagination;
	const current = !pagination ? 1 : pagination?.current;
	const pageSize = !pagination ? 10 : pagination?.pageSize;
	const localPagination = !pagination ? false : pagination.localPagination;

	// 分页数据源
	const paginationDatasource = useMemo(() => {
		if (havePagination && localPagination) {
			return (dataSource ?? []).slice(pageSize * (current - 1), pageSize * current);
		}

		return dataSource ?? [];
	}, [dataSource, current, pageSize, localPagination, havePagination]);

	return paginationDatasource;
};

export type DataSource<T> = ReturnType<typeof useDataSource<T>>;
export default useDataSource;
