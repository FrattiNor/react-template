import { useRef } from 'react';

import type { AnyObj, VirtualTreeInstance } from '../type';

const useTreeInstance = <T extends AnyObj>() => {
    const ref = useRef<VirtualTreeInstance<T>>(null);
    return ref;
};

export default useTreeInstance;
