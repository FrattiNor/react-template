import { useRef } from 'react';

const useLatest = <T>(value: T) => {
    const ref = useRef<T>(value);
    ref.current = value;
    const latest = () => {
        return ref.current;
    };
    return { latest };
};

export default useLatest;
