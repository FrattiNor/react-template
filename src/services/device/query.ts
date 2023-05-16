import { useCallback, useMemo, useReducer, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DeviceListItem } from './type';
import { getDeviceListV2 } from './api';

export const useDeviceList = (view: number) => {
    const pageSize = 100;
    const rerender = useReducer(() => ({}), {})[1];
    const [params, setParams] = useState<Record<string, any>>({});
    const queryKey = ['device', view, pageSize, params];

    const query = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam }) => {
            if (pageParam === false) return;
            const paginationParams = { current: typeof pageParam === 'number' ? pageParam : 1, pageSize };
            return getDeviceListV2({ view, ...paginationParams, ...params });
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
    const pages = query.data?.pages;
    const data = useMemo(() => pages?.reduce((a, b) => [...(a || []), ...(b?.list || [])], [] as DeviceListItem[]) || [], [pages]);
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

    return { setParams, fetchNextPage, refetch, data, count, empty };
};
