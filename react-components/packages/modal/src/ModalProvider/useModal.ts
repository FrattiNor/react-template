import { useContext } from 'react';
import Context from './Context';

const useModal = () => {
    return useContext(Context);
};

export default useModal;
