import { useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import useDelay from '@react/hooks/useDelay';
import RequestClient from './RequestClient';
import QueryContext from './QueryContext';

type Props<T> = {
    delay?: number;
    queryKey: any[];
    enabled?: boolean;
    queryFn: (request: RequestClient) => Promise<T>;
};

const useQuery = <T>(props: Props<T>) => {
    const { queryKey, queryFn, delay, enabled } = props;

    const key = JSON.stringify(queryKey);
    const request = useMemo(() => new RequestClient(), []);
    const delayQueryFn = useDelay({ delayFn: queryFn, delay });
    const { queryData, setQueryData, queryLoading, setQueryLoading, rerender } = useContext(QueryContext);

    const data = queryData[key];
    const loading = queryLoading[key] ?? false;

    const loadingCountRef = useRef(0);
    const firstLoading = useMemo(() => {
        if (loading === true && loadingCountRef.current === 0) {
            loadingCountRef.current++;
            return true;
        }
        return false;
    }, [loading]);

    const fetch = () => {
        if (enabled && loading !== true) {
            setQueryLoading({ [key]: true });
            rerender();
            delayQueryFn(request).then(
                (v) => {
                    setQueryData({ [key]: v });
                    setQueryLoading({ [key]: false });
                    rerender();
                    return v;
                },
                () => {
                    setQueryLoading({ [key]: false });
                    rerender();
                },
            );
        }
    };

    useLayoutEffect(() => {
        fetch();
    }, [key, enabled]);

    useEffect(() => {
        return () => {
            request.cancel();
        };
    }, []);

    return { data, loading, firstLoading, refetch: fetch };
};

export default useQuery;
