import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import useDelay from '../useDelay';

type Props<T> = Omit<UseQueryOptions, 'queryFn'> & {
    queryFn: () => Promise<T | null>;
    delay?: number;
};

// 在默认的useQuery中加入一些默认配置以及增加一些参数
const useQuery2 = <T>({ queryKey, delay, queryFn, cacheTime, staleTime }: Props<T>) => {
    const [delayFn] = useDelay({ delayFn: queryFn, delay: delay || 0 });

    const query = useQuery({
        queryKey,
        queryFn: delayFn,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retryOnMount: false,
        retry: false,
        cacheTime: cacheTime || 0,
        staleTime: staleTime || 0,
    });

    return query;
};

export default useQuery2;
