import { AutoModalRender } from '../AutoModalRender';
import { FC, PropsWithChildren } from 'react';
import useProvider from './useProvider';
import { AutoModals } from '../type';
import Context from './Context';

type Props = PropsWithChildren<{
    modals?: AutoModals;
    autoRender?: boolean;
}>;

const Provider: FC<Props> = ({ children, modals, autoRender }) => {
    const value = useProvider({ modals });
    return (
        <Context.Provider value={value}>
            {children}
            {autoRender && <AutoModalRender />}
        </Context.Provider>
    );
};

export default Provider;
