import { FC, PropsWithChildren } from 'react';
import { TranslationProps } from './type';
import Context from './Context';
import useData from './useData';

const Provider: FC<PropsWithChildren<TranslationProps>> = ({ children, local, t1Maps, t2Maps }) => {
    const value = useData({ local, t1Maps, t2Maps });
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
