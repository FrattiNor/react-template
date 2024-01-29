import { WrapperContext, InnerContext } from './Context';
import { useCallback, useContext } from 'react';

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
