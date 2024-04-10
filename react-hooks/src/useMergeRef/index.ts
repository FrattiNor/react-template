import { useRef } from 'react';

function useMergeRef<T>(__ref?: T) {
    const _ref = useRef(null);
    const ref = __ref ?? _ref;
    return ref as T;
}

export default useMergeRef;
