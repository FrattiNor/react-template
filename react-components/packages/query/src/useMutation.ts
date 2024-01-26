import { useDelayWithLoading } from '@react/hooks';
import RequestClient from './RequestClient';
import { useEffect, useMemo } from 'react';

type Props<T, Opt = void> = {
    delay?: number;
    enabled?: boolean;
    mutationFn: (request: RequestClient, opt: Opt) => Promise<T>;
};

const useMutation = <T, Opt = void>(props: Props<T, Opt>) => {
    const { mutationFn, delay, enabled } = props;
    const request = useMemo(() => new RequestClient(), []);
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
    };

    return { loading, mutateAsync };
};

export default useMutation;
