import { useContext } from 'react';

import Context, { ContextProps } from './Context';
import { AutoModals } from '../type';

const useAutoModal = <M extends AutoModals>() => {
    return useContext<ContextProps<M>>(Context as any);
};

export default useAutoModal;
