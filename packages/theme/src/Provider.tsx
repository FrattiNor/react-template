import { FC, PropsWithChildren } from 'react';
import Context from './Context';
import useData from './useData';
import { Theme } from './type';

type Props = {
    theme?: Theme;
};

const Provider: FC<PropsWithChildren<Props>> = ({ children, theme }) => {
    const value = useData({ theme });
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
