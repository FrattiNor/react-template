type Props<F extends (...args: any[]) => Promise<any>> = {
    delayFn: F;
    delay: number;
};

const useDelay = <F extends (...args: any[]) => Promise<any>>({ delayFn, delay }: Props<F>) => {
    if (typeof delay !== 'number' || delay <= 0) {
        return [delayFn];
    }

    const newFn = async (...args: Parameters<F>): Promise<Awaited<ReturnType<F>>> => {
        const startTime = new Date().getTime();
        const res = await delayFn(...args);
        const endTime = new Date().getTime();
        // 剩余时间
        const remainder = delay - (endTime - startTime);
        if (remainder > 0)
            await new Promise((resolve) => {
                setTimeout(resolve, remainder);
            });
        return res;
    };

    return [newFn];
};

export default useDelay;
