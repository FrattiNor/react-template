/* eslint-disable @typescript-eslint/no-shadow */
import { useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import RequestClient from './RequestClient';
import QueryContext from './QueryContext';
import { useDelay } from '@react/hooks';

type Props<T> = {
    delay?: number;
    queryKey: any[];
    enabled?: boolean;
    queryFn: (request: RequestClient) => Promise<T>;
};

const useQuery = <T>(props: Props<T>) => {
    // client
    const request = useMemo(() => new RequestClient(), []);

    // context
    const { queryDataRef, queryLoadingRef, rerender } = useContext(QueryContext);
    // context fun
    const setLoading = (obj: Record<string, boolean>) => {
        queryLoadingRef.current = {
            ...queryLoadingRef.current,
            ...obj,
        };
    };
    const setData = (obj: Record<string, T>) => {
        queryDataRef.current = {
            ...queryDataRef.current,
            ...obj,
        };
    };
    const deleteLoading = (key: string) => {
        delete queryLoadingRef.current[key];
    };
    const deleteData = (key: string) => {
        delete queryDataRef.current[key];
    };

    // props
    const { queryKey, queryFn, delay, enabled = true } = props;
    const delayQueryFn = useDelay({ delayFn: queryFn, delay });

    // key & keyQueen
    const newKey = JSON.stringify(queryKey);
    const keyQueenRef = useRef([newKey]);
    (() => {
        const lastKey = keyQueenRef.current[keyQueenRef.current.length - 1];
        if (newKey !== lastKey) {
            // 当有新key出现时，插入到keyQueen中，并清除当前key的数据【避免循环切换，数据复用的问题】
            keyQueenRef.current.push(newKey);
            deleteLoading(newKey);
            deleteData(newKey);
        }
        // 当keyQueen的长度超过2时，从前开始清除旧数据
        while (keyQueenRef.current.length > 2) {
            const needCleanKey = keyQueenRef.current.shift();
            if (needCleanKey) deleteLoading(needCleanKey);
            if (needCleanKey) deleteData(needCleanKey);
        }
    })();
    const oldKey = keyQueenRef.current[keyQueenRef.current.length - 2];
    const currentKey = keyQueenRef.current[keyQueenRef.current.length - 1];

    // loading & firstLoading
    const loadingCountRef = useRef(0);
    const loading = queryLoadingRef.current[currentKey] ?? false;
    const firstLoading = useMemo(() => {
        if (loading === true && loadingCountRef.current === 0) {
            loadingCountRef.current++;
            return true;
        }
        return false;
    }, [loading]);

    // data
    const data = (() => {
        const oldData = queryDataRef.current[oldKey];
        const currentData = queryDataRef.current[currentKey];
        return (currentData ?? oldData) as T | undefined;
    })();

    // fetch
    const fetch = () => {
        const currentKey = keyQueenRef.current[keyQueenRef.current.length - 1];
        const currentLoading = queryLoadingRef.current[currentKey];
        if (enabled && currentLoading !== true) {
            setLoading({ [currentKey]: true });
            rerender();

            delayQueryFn(request).then(
                (value) => {
                    setData({ [currentKey]: value });
                    setLoading({ [currentKey]: false });
                    rerender();
                    return value;
                },
                () => {
                    setLoading({ [currentKey]: false });
                    rerender();
                },
            );
        }
    };

    // auto fetch
    useLayoutEffect(() => {
        fetch();
    }, [currentKey, enabled]);

    // auto cancel
    useEffect(() => {
        return () => {
            request.cancel();
        };
    }, []);

    return { data, loading, firstLoading, refetch: fetch };
};

export default useQuery;