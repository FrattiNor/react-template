import { useRef } from 'react';

import type { AnyObj, VirtualListInstance } from '../type';

const useListInstance = <T extends AnyObj>() => {
    const ref = useRef<VirtualListInstance<T>>(null);
    return ref;
};

export default useListInstance;
