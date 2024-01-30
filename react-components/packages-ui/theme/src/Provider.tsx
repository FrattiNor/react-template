import { FC, PropsWithChildren } from 'react';

import Context from './Context';
import { ThemeProps } from './type';
import useProvider from './useProvider';

const Provider: FC<PropsWithChildren<ThemeProps>> = ({ children, ...props }) => {
    const value = useProvider(props);
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
