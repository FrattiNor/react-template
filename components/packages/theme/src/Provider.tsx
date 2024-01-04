import { FC, PropsWithChildren } from 'react';
import Context from './Context';
import useData from './useData';
import { Props } from './type';

const Provider: FC<PropsWithChildren<Props>> = ({ children, theme }) => {
    const value = useData({ theme });
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
