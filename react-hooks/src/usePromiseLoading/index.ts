import { useState } from 'react';

import getPromiseLoadingFun from './getPromiseLoadingFun';
import { PromiseFn, Props } from './type';

const usePromiseLoading = <F extends PromiseFn>({ promiseFn }: Props<F>) => {
    const [loading, setLoading] = useState(false);
    const fn = getPromiseLoadingFun({ promiseFn, setLoading });
    return [fn, loading] as [F, boolean];
};

export { getPromiseLoadingFun };
export default usePromiseLoading;
