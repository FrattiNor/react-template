import { FC, PropsWithChildren } from 'react';
import Context from './Context';
import useData from './useData';
import { Props } from './type';

const Provider: FC<PropsWithChildren<Props>> = ({ children, local, t1Maps, t2Maps }) => {
    const value = useData({ local, t1Maps, t2Maps });
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
