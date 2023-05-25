/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, PropsWithChildren, useCallback, useState } from 'react';
import Context from './context';

const KeepAliveProvider: FC<PropsWithChildren> = ({ children }) => {
    const [cacheMap, setCacheMap] = useState({});
    const [needCacheMap, setNeedCacheMap] = useState({});
    const cache = useCallback((id: string) => {
        setNeedCacheMap((m) => ({ ...m, [id]: true }));
    }, []);
    return <Context.Provider value={{ cacheMap, setCacheMap, needCacheMap, setNeedCacheMap, cache }}>{children}</Context.Provider>;
};

export default KeepAliveProvider;
