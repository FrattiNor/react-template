import { FC, PropsWithChildren } from 'react';
import useProvider from './useProvider';
import { AutoModals } from '../type';
import Context from './Context';

type Props = PropsWithChildren<{
    modals?: AutoModals;
}>;

const Provider: FC<Props> = ({ children, modals }) => {
    const value = useProvider({ modals });
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
