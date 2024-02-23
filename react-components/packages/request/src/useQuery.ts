import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { useDelayWithLoading } from '@react/hooks';

import RequestClient from './RequestClient';
import RequestContext from './RequestContext';

type Props<T> = {
    delay?: number;
    enabled?: boolean;
    queryKey?: any[];
    queryFn: (request: RequestClient) => Promise<T>;
};

const useQuery = <T>(props: Props<T>) => {
    const firstLoadingFlag = useRef(false);
    const [data, setData] = useState<T | undefined>(undefined);
    const { queryFn, queryKey, delay, enabled = true } = props;
    const { afterRequest, beforeRequest } = useContext(RequestContext);
    const request = useMemo(() => new RequestClient({ afterRequest, beforeRequest }), []);
    const [delayQueryFn, loading] = useDelayWithLoading({ delayFn: queryFn, delay });

    const firstLoading = useMemo(() => {
        if (firstLoadingFlag.current === false && loading === true) {
            firstLoadingFlag.current = true;
            return true;
        }
        return false;
    }, [loading]);

    const fetch = () => {
        delayQueryFn(request).then((v) => {
            setData(v);
        });
    };

    useEffect(() => {
        return () => {
            request.cancel();
        };
    }, []);

    useEffect(() => {
        if (enabled) {
            fetch();
        }
    }, [enabled, JSON.stringify(queryKey)]);

    return { data, loading, firstLoading, refetch: fetch };
};

export default useQuery;
