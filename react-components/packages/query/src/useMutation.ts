import { useContext, useEffect, useMemo } from 'react';
import { useDelayWithLoading } from '@react/hooks';
import RequestClient from './RequestClient';
import QueryContext from './QueryContext';

type Props<T, Opt = void> = {
    delay?: number;
    enabled?: boolean;
    mutationKey: any[];
    mutationFn: (request: RequestClient, opt: Opt) => Promise<T>;
};

const useMutation = <T, Opt = void>(props: Props<T, Opt>) => {
    const { mutationFn, delay, enabled = true } = props;
    const { afterRequest, beforeRequest } = useContext(QueryContext);
    const request = useMemo(() => new RequestClient({ afterRequest, beforeRequest }), []);
    const [delayMutationFn, loading] = useDelayWithLoading({ delayFn: mutationFn, delay });

    useEffect(() => {
        return () => {
            request.cancel();
        };
    }, []);

    const mutateAsync = (opt: Opt) => {
        if (enabled) {
            return delayMutationFn(request, opt);
        }
        return Promise.reject();
    };

    return { loading, mutateAsync };
};

export default useMutation;
