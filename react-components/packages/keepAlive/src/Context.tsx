import { FC, PropsWithChildren, useRef, useState, createContext } from 'react';

import { WrapperContextProps, InnerContextProps, CacheItem } from './type';

export const InnerContext = createContext<InnerContextProps>({} as InnerContextProps);

export const WrapperContext = createContext<WrapperContextProps>({} as WrapperContextProps);

export const KeepAliveWrapperProvider: FC<PropsWithChildren> = ({ children }) => {
    const needCacheMapRef = useRef<Record<string, boolean>>({});
    const unActivateRef = useRef<Record<string, Array<() => void>>>({});
    const activateRef = useRef<Record<string, Array<() => void>>>({});
    const [cacheMap, setCacheMap] = useState<Record<string, CacheItem>>({});

    return (
        <WrapperContext.Provider value={{ cacheMap, setCacheMap, needCacheMapRef, unActivateRef, activateRef }}>
            {children}
            {Object.entries(cacheMap).map(([cacheKey, { portal }]) => (
                <InnerContext.Provider key={cacheKey} value={{ cacheKey }}>
                    {portal}
                </InnerContext.Provider>
            ))}
        </WrapperContext.Provider>
    );
};
