import getDelayFun from './getDelayFun';
import { useState } from 'react';

type PromiseFn = (...args: any[]) => Promise<any>;

type Props<F extends PromiseFn> = {
    delayFn: F;
    delay?: number;
};

const useDelay = <F extends PromiseFn>({ delayFn, delay }: Props<F>) => {
    const [loading, setLoading] = useState(false);
    const fn = getDelayFun({ delayFn, delay, setLoading });
    return [fn, loading] as [F, boolean];
};

export default useDelay;
