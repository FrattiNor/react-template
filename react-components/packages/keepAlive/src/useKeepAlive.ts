import { useCallback, useContext } from 'react';

import { WrapperContext, InnerContext } from './Context';

const useKeepAlive = () => {
    const { cacheKey } = useContext(InnerContext);
    const { needCacheMapRef } = useContext(WrapperContext);

    const setCache = useCallback((v: boolean) => {
        needCacheMapRef.current = { ...needCacheMapRef.current, [cacheKey]: v };
        return Promise.resolve();
    }, []);

    return { setCache };
};

export default useKeepAlive;
