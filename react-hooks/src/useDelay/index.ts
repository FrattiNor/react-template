import { PromiseFn, Props } from './type';
import getDelayFun from './getDelayFun';

const useDelay = <F extends PromiseFn>({ delayFn, delay }: Props<F>) => {
    return getDelayFun({ delayFn, delay });
};

export default useDelay;
