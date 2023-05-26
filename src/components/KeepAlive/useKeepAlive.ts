import { useContext } from 'react';
import Context from './context';

const useKeepAlive = () => {
    const { setCache } = useContext(Context);
    return { setCache };
};

export default useKeepAlive;
