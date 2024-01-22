import Context, { ContextProps } from './Context';
import { AutoModals } from '../type';
import { useContext } from 'react';

const useAutoModalProvider = <M extends AutoModals>() => {
    return useContext<ContextProps<M>>(Context as any);
};

export default useAutoModalProvider;
