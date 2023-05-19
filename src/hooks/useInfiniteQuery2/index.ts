/* eslint-disable @tanstack/query/exhaustive-deps */
import { UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useReducer, useState } from 'react';
import { paramsArrayToStr } from '@/utils/params';
import { ListData } from '@/global';
import useDelay from '../useDelay';

type Params = Record<string, any>;
type PaginationParams = { current: number; pageSize: number };

type Props<T> = Omit<UseInfiniteQueryOptions, 'queryFn'> & {
    queryFn: (p: { params: Params; paginationParams: PaginationParams }) => Promise<ListData<T> | null>;
    pageSize?: number;
    delay?: number;
    arrayToString?: string[];
};

// 在默认的 useInfiniteQuery 中加入一些默认配置以及增加一些参数
const useInfiniteQuery2 = <T>({ pageSize = 50, queryKey, delay, queryFn, arrayToString }: Props<T>) => {
    const [delayFn] = useDelay({ delayFn: queryFn, delay: delay || 0 });
    const rerender = useReducer(() => ({}), {})[1];
    const [params, setParams] = useState<Params>({});
    const _queryKey = [...(queryKey || []), pageSize, params];

    const query = useInfiniteQuery({
        queryKey: _queryKey,
        queryFn: ({ pageParam }) => {
            if (pageParam === false) return;
            const paginationParams = { current: typeof pageParam === 'number' ? pageParam : 1, pageSize };
            console.log('params', params);
            const handledParams = arrayToString ? paramsArrayToStr(params, arrayToString) : params;
            console.log('handledParams', handledParams);
            return delayFn({ paginationParams, params: handledParams });
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
        cacheTime: 0,
        staleTime: 0,
    });

    const isFetchingNextPage = query.isFetchingNextPage;
    const hasNextPage = query.hasNextPage;
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

    // 删除增加参数
    const addAndDelParams = ({ add, del }: { add?: Record<string, any>; del?: string[] }) => {
        setParams((beforeParams) => {
            let nextParams = { ...beforeParams };
            if (del) del.forEach((key) => delete nextParams[key]);
            if (add) nextParams = { ...nextParams, ...add };
            return { ...nextParams };
        });
    };

    return { ...query, setParams, addAndDelParams, fetchNextPage, refetch, data, params, count, empty };
};

export default useInfiniteQuery2;
