import { useEffect } from 'react';

const useMousedownBlank = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    useEffect(() => {
        const documentMousedown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (ref.current) {
                if (!target.contains(ref.current)) {
                    callback();
                }
            } else {
                callback();
            }
        };

        document.addEventListener('mousedown', documentMousedown);

        return () => {
            document.removeEventListener('mousedown', documentMousedown);
        };
    }, []);
};

export default useMousedownBlank;
