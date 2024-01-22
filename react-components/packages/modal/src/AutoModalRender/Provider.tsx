import { FC, PropsWithChildren } from 'react';
import useProvider from './useProvider';
import Context from './Context';

const Provider: FC<PropsWithChildren<{ modalKey: string; id: string }>> = ({ modalKey, id, children }) => {
    const value = useProvider({ key: modalKey, id });
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
