import { CSSProperties, MutableRefObject, PropsWithChildren, ReactPortal, SetStateAction, Dispatch } from 'react';

export type Props = PropsWithChildren<{
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;
    contentClassName?: string;
    contentStyle?: string;
    cacheKey: string;
}>;

export type CacheItem = {
    element: HTMLDivElement;
    portal: ReactPortal;
};

export type WrapperContextProps = {
    cacheMap: Record<string, CacheItem>;
    setCacheMap: Dispatch<SetStateAction<Record<string, CacheItem>>>;
    needCacheMapRef: MutableRefObject<Record<string, boolean>>;
    unActivateRef: MutableRefObject<Record<string, Array<() => void>>>;
    activateRef: MutableRefObject<Record<string, Array<() => void>>>;
};

export type InnerContextProps = {
    cacheKey: string;
};
