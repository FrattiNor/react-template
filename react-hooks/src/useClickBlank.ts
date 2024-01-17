import { useEffect } from 'react';

const useClickBlank = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    useEffect(() => {
        const documentClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (ref.current) {
                if (!target.contains(ref.current)) {
                    callback();
                }
            } else {
                callback();
            }
        };

        document.addEventListener('click', documentClick);

        return () => {
            document.removeEventListener('click', documentClick);
        };
    }, []);
};

export default useClickBlank;
