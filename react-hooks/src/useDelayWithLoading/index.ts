import { delayFunc } from '@react/utils';

import usePromiseLoading from '../usePromiseLoading';

type PromiseFn = (...args: any[]) => Promise<any>;

type Props<F extends PromiseFn> = {
	delayFn: F;
	delay?: number;
};

const useDelayWithLoading = <F extends PromiseFn>({ delayFn, delay }: Props<F>) => {
	const fn = delayFunc(delayFn, delay);
	const [fn2, loading] = usePromiseLoading({ promiseFn: fn });
	return [fn2, loading] as [F, boolean];
};

export default useDelayWithLoading;
