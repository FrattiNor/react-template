import { InnerContext, WrapperContext } from './Context';
import { useContext, useEffect } from 'react';

// 保留时挂载执行
const useActivate = (callback: () => void) => {
    const { cacheKey } = useContext(InnerContext);
    const { activateRef } = useContext(WrapperContext);

    // 注册进activateRef
    useEffect(() => {
        const oldListener = activateRef.current[cacheKey] || [];
        activateRef.current = { ...activateRef.current, [cacheKey]: [...oldListener, callback] };
    }, []);
};

export default useActivate;
