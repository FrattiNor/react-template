import { FC, PropsWithChildren } from 'react';

import Context from './Context';
import useProvider from './useProvider';

const Provider: FC<PropsWithChildren<{ keyId: string }>> = ({ keyId, children }) => {
    const value = useProvider(keyId);
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
