import { FC, PropsWithChildren } from 'react';
import useProvider from './useProvider';
import { ThemeProps } from './type';
import Context from './Context';

const Provider: FC<PropsWithChildren<ThemeProps>> = ({ children, theme }) => {
    const value = useProvider({ theme });
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
