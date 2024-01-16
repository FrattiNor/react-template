import { FC, PropsWithChildren } from 'react';
import { ThemeProps } from './type';
import Context from './Context';
import useData from './useData';

const Provider: FC<PropsWithChildren<ThemeProps>> = ({ children, theme }) => {
    const value = useData({ theme });
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
