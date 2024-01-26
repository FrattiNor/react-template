import { FC, PropsWithChildren } from 'react';
import { TranslationProps } from './type';
import useProvider from './useProvider';
import Context from './Context';

const Provider: FC<PropsWithChildren<TranslationProps>> = ({ children, local, t1Maps, t2Maps }) => {
    const value = useProvider({ local, t1Maps, t2Maps });
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;