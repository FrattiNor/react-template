import { useCallback, useContext } from 'react';
import Context2 from './context2';

const useKeepAlive2 = () => {
    const { setNeedCacheMap } = useContext(Context2);

    const setCache = useCallback((name: string, v: boolean) => {
        setNeedCacheMap((n) => ({ ...n, [name]: v }));
        return Promise.resolve();
    }, []);

    return { setCache };
};

export default useKeepAlive2;
