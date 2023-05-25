import { useContext } from 'react';
import Context from './context';

const useKeepAlive = () => {
    const { cache } = useContext(Context);
    return { cache };
};

export default useKeepAlive;
