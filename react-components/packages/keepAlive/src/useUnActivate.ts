import { useContext, useEffect } from 'react';

import { InnerContext, WrapperContext } from './Context';

// 保留时卸载执行
const useUnActivate = (callback: () => void) => {
    const { cacheKey } = useContext(InnerContext);
    const { unActivateRef } = useContext(WrapperContext);

    // 注册进unActivateRef
    useEffect(() => {
        const oldListener = unActivateRef.current[cacheKey] || [];
        unActivateRef.current = { ...unActivateRef.current, [cacheKey]: [...oldListener, callback] };
    }, []);
};

export default useUnActivate;
