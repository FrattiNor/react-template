import { ModalProviderProps } from '../type';
import useProvider from './useProvider';
import Context from './Context';
import { FC } from 'react';

const Provider: FC<ModalProviderProps> = ({ children, modals }) => {
    const value = useProvider({ modals });
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
