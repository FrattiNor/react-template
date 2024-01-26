import { FC, PropsWithChildren } from 'react';
import useProvider from './useProvider';
import Context from './Context';

const Provider: FC<PropsWithChildren<{ keyId: string }>> = ({ keyId, children }) => {
    const value = useProvider(keyId);
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
