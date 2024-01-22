import { useContext } from 'react';
import Context from './Context';

const useAutoModalRender = () => {
    return useContext(Context);
};

export default useAutoModalRender;
