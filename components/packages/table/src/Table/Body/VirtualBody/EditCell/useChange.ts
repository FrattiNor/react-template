import { useEffect, useRef } from 'react';

const useChange = <T>(v: T, onChange: (v: T) => void) => {
    const beforeV = useRef(v);

    useEffect(() => {
        if (beforeV.current !== v) {
            beforeV.current = v;
            onChange(v);
        }
    }, [v]);
};

export default useChange;
