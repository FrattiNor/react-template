import { FC, PropsWithChildren, useState } from 'react';
import Context2 from './context2';
import { Cache } from './type';

const KeepAliveProvider2: FC<PropsWithChildren> = ({ children }) => {
    const [cacheMap, setCacheMap] = useState<Record<string, Cache>>({});
    const [needCacheMap, setNeedCacheMap] = useState({});

    return (
        <Context2.Provider value={{ cacheMap, setCacheMap, needCacheMap, setNeedCacheMap }}>
            {children}
            {Object.values(cacheMap).map(({ portal }) => portal)}
        </Context2.Provider>
    );
};

export default KeepAliveProvider2;
