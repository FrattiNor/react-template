import { FC, PropsWithChildren } from 'react';

import Context from './Context';
import useProvider from './useProvider';
import { AutoModalRender } from '../AutoModalRender';
import { AutoModals } from '../type';

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
