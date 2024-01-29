import { FC, PropsWithChildren } from 'react';
import useProvider from './useProvider';
import { ThemeProps } from './type';
import Context from './Context';

const Provider: FC<PropsWithChildren<ThemeProps>> = ({ children, ...props }) => {
    const value = useProvider(props);
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
