import { CSSProperties, Dispatch, PropsWithChildren, ReactPortal, SetStateAction } from 'react';

export type Props = PropsWithChildren<{
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;
    contentClassName?: string;
    contentStyle?: string;
    cacheKey: string;
}>;

export type Cache = {
    element: HTMLDivElement;
    portal: ReactPortal;
};

export type ContextProps = {
    cacheMap: Record<string, Cache>;
    setCacheMap: Dispatch<SetStateAction<Record<string, Cache>>>;
    needCacheMap: Record<string, boolean>;
    setNeedCacheMap: Dispatch<SetStateAction<Record<string, boolean>>>;
};
