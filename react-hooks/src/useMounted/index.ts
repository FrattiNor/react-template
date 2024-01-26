import { useRef } from 'react';

const useMounted = (callback: () => void) => {
    const mounted = useRef(false);
    if (!mounted.current) {
        mounted.current = true;
        callback();
    }
};

export default useMounted;
