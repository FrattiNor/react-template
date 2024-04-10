import getDelayFun from './getDelayFun';
import type { PromiseFn, Props } from './type';

const useDelay = <F extends PromiseFn>({ delayFn, delay }: Props<F>) => {
    return getDelayFun({ delayFn, delay });
};

export default useDelay;
