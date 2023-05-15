import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { DeviceListItem } from './type';
import { getDeviceListV2 } from './api';

export const useDeviceList = (view: number) => {
    const pageSize = 100;
    const [params, setParams] = useState<Record<string, any>>({});
    const queryKey = ['device', view, pageSize, params];

    const query = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam }) => {
            const paginationParams = pageParam || { current: 1, pageSize };
            return getDeviceListV2({ view, ...paginationParams, ...params }).then((res) => {
                return res;
            });
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage) return false;
            const nextPage = lastPage.pagination.current + 1;
            const maxPage = lastPage.pagination.totalPages;
            if (nextPage > maxPage) return false;
            return { current: lastPage.pagination.current + 1, pageSize };
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // keepPreviousData: true,
        refetchOnMount: false,
        retryOnMount: false,
        retry: false,
    });

    const data = useMemo(() => query.data?.pages?.reduce((a, b) => [...(a || []), ...(b?.list || [])], [] as DeviceListItem[]) || [], [query.data]);
    const isFetchingNextPage = query.isFetchingNextPage;
    const fetchNextPage = query.fetchNextPage;
    const hasNextPage = query.hasNextPage;
    const count = data.length;
    // query 自带的 refetch 会从1 - n的页面数据重新获取一次
    const refetch = () => {
        query.remove();
        return query.refetch();
    };

    return { setParams, fetchNextPage, refetch, isFetchingNextPage, hasNextPage, data, count };
};
