type PromiseFn = (...args: any[]) => Promise<any>;

type Props<F extends PromiseFn> = {
    delayFn: F;
    delay?: number;
    setLoading: (v: boolean) => void;
};

const getDelayFun = <F extends PromiseFn>({ delayFn, delay, setLoading }: Props<F>): F => {
    if (typeof delay !== 'number' || delay <= 0) {
        return delayFn;
    }

    const newFn = async (...args: Parameters<F>) => {
        try {
            setLoading(true);
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
            setLoading(false);
            return res;
        } catch (e) {
            setLoading(false);
            console.error(e);
        }
    };

    return newFn as F;
};

export default getDelayFun;
