import { FC, PropsWithChildren } from 'react';

import Context from './Context';
import { TranslationProps } from './type';
import useProvider from './useProvider';

const Provider: FC<PropsWithChildren<TranslationProps>> = ({ children, defaultLocal, t1Map, t2Map }) => {
    const value = useProvider({ defaultLocal, t1Map, t2Map });
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
