import { FC, PropsWithChildren } from 'react';
import useProvider from './useProvider';
import Context from './Context';

const Provider: FC<PropsWithChildren> = ({ children }) => {
    const value = useProvider();
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
