import { useContext } from 'react';
import Context from './Context';

const useTheme = () => {
    return useContext(Context);
};

export default useTheme;
