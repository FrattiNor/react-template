import type { FC, PropsWithChildren } from 'react';

import Context from './Context';
import useProvider from './useProvider';

import type { TranslationProps } from './type';

const Provider: FC<PropsWithChildren<TranslationProps>> = ({ children, defaultLocal, t1Map, t2Map }) => {
    const value = useProvider({ defaultLocal, t1Map, t2Map });
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
