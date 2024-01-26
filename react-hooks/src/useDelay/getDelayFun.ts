import { PromiseFn, Props } from './type';

const getDelayFun = <F extends PromiseFn>({ delayFn, delay }: Props<F>): F => {
    if (typeof delay !== 'number' || delay <= 0) {
        return delayFn;
    }

    const newFn = async (...args: Parameters<F>) => {
        const startTime = new Date().getTime();
        const res = await delayFn(...args);
        const endTime = new Date().getTime();
        // 剩余时间
        const remainder = delay - (endTime - startTime);
        if (remainder > 0) {
            await new Promise((resolve) => {
                setTimeout(resolve, remainder);
            });
        }
        return res;
    };

    return newFn as F;
};

export default getDelayFun;
