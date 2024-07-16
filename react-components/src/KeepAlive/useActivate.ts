import { useContext, useEffect } from 'react';

import { InnerContext, WrapperContext } from './Context';

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
