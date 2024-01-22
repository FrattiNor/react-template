import { useContext } from 'react';
import Context from './Context';

const useCurrentAutoModal = () => {
    return useContext(Context);
};

export default useCurrentAutoModal;
