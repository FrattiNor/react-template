import { useCallback, useMemo, useReducer, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ListData } from '@/global';
import useDelay from '../useDelay';

type Params = Record<string, any>;
type PaginationParams = { current: number; pageSize: number };

type Props<T> = {
    queryKey: any[];
    fetchFn: (p: { params: Params; paginationParams: PaginationParams }) => Promise<ListData<T> | null>;
    pageSize?: number;
    delay?: number;
};

const useInfiniteList = <T>({ pageSize = 50, queryKey, delay, fetchFn }: Props<T>) => {
    const [delayFn] = useDelay({ delayFn: fetchFn, delay: delay || 0 });
    const rerender = useReducer(() => ({}), {})[1];
    const [params, setParams] = useState<Params>({});
    const _queryKey = [...queryKey, pageSize, params];

    const query = useInfiniteQuery({
        queryKey: _queryKey,
        queryFn: ({ pageParam }) => {
            if (pageParam === false) return;
            const paginationParams = { current: typeof pageParam === 'number' ? pageParam : 1, pageSize };
            return delayFn({ paginationParams, params });
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage) return false;
            const nextPage = lastPage.pagination.current + 1;
            const maxPage = lastPage.pagination.totalPages;
            if (nextPage > maxPage) return false;
            return nextPage;
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        keepPreviousData: true,
        refetchOnMount: false,
        retryOnMount: false,
        retry: false,
    });

    const isFetchingNextPage = query.isFetchingNextPage;
    const hasNextPage = query.hasNextPage;
    const loading = query.isLoading;
    const pages = query.data?.pages;
    const data = useMemo(() => pages?.reduce((a, b) => [...(a || []), ...(b?.list || [])], [] as T[]) || [], [pages]);
    const count = data.length;
    const empty = count === 0;

    // query 自带的 refetch 会从1 - n的页面数据重新获取一次
    const refetch = useCallback(() => {
        // 将之前的data数据保留第一条，即可只请求第一页
        if (query.data) {
            query.data.pages = [query.data.pages[0]];
            query.data.pageParams = [query.data.pageParams[0]];
        }
        // refetch 不会触发任何更新， rerender 触发一下 data 更新
        return query.refetch().then(rerender);
    }, [query]);

    // fetchNextPage 不会自动拦截没有 hasNextPage 的情况
    const fetchNextPage = useCallback(() => {
        if (!isFetchingNextPage && hasNextPage) {
            return query.fetchNextPage();
        }
        return Promise.resolve();
    }, [isFetchingNextPage, hasNextPage]);

    return { setParams, fetchNextPage, refetch, data, params, count, empty, loading, hasNextPage, isFetchingNextPage };
};

export default useInfiniteList;
