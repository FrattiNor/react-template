import Context, { ContextProps } from './Context';
import { AutoModals } from '../type';
import { useContext } from 'react';

const useAutoModal = <M extends AutoModals>() => {
    return useContext<ContextProps<M>>(Context as any);
};

export default useAutoModal;
