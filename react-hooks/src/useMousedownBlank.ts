import { useEffect } from 'react';

type Opt = {
    callback: () => void;
    elements?: HTMLElement[];
    refs?: React.RefObject<HTMLElement | null>[];
};

const useMousedownBlank = (opt: Opt) => {
    useEffect(() => {
        const { callback, elements = [], refs = [] } = opt;

        const documentMousedown = (e: MouseEvent) => {
            let isContains = false;
            const target = e.target as HTMLElement;

            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                if (element && element.contains(target)) {
                    isContains = true;
                    break;
                }
            }

            for (let i = 0; i < refs.length; i++) {
                if (isContains === true) break;
                const element = refs[i].current;
                if (element && element.contains(target)) {
                    isContains = true;
                    break;
                }
            }

            if (isContains === false) {
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
