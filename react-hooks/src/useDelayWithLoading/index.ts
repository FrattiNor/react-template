import useDelay from '../useDelay';
import { PromiseFn, Props } from '../useDelay/type';
import usePromiseLoading from '../usePromiseLoading';

const useDelayWithLoading = <F extends PromiseFn>({ delayFn, delay }: Props<F>) => {
    const fn = useDelay({ delayFn, delay });
    const [fn2, loading] = usePromiseLoading({ promiseFn: fn });
    return [fn2, loading] as [F, boolean];
};

export default useDelayWithLoading;
