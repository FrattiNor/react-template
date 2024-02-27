type PromiseFn = (...args: any[]) => Promise<any>;

type Props<F extends PromiseFn> = {
    promiseFn: F;
    setLoading: (v: boolean) => void;
};

const getPromiseLoadingFun = <F extends PromiseFn>({ promiseFn, setLoading }: Props<F>): F => {
    const newFn = async (...args: Parameters<F>) => {
        try {
            setLoading(true);
            const res = await promiseFn(...args);
            setLoading(false);
            return res;
        } catch (e) {
            setLoading(false);
            console.error(e);
        }
    };

    return newFn as F;
};

export default getPromiseLoadingFun;
