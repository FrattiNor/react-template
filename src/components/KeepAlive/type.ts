import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export type ContextProps = {
    cache: (id: string) => void;
    cacheMap: Record<string, any>;
    setCacheMap: Dispatch<SetStateAction<Record<string, any>>>;
    needCacheMap: Record<string, any>;
    setNeedCacheMap: Dispatch<SetStateAction<Record<string, any>>>;
};

export type Props = PropsWithChildren<{
    id: string;
}>;
