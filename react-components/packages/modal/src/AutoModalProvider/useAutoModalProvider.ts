import { useContext } from 'react';
import Context from './Context';

const useAutoModalProvider = () => {
    return useContext(Context);
};

export default useAutoModalProvider;
