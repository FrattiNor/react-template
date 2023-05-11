import { useMatches } from 'react-router-dom';
import { useEffect } from 'react';

const useTitle = () => {
    const matches = useMatches();

    useEffect(() => {
        let nextTitle = '';
        for (let i = matches.length - 1; i >= 0; i--) {
            const title = (matches[i].handle as any)?.title;
            if (title) {
                nextTitle = title;
                break;
            }
        }
        if (nextTitle) {
            document.title = nextTitle;
        }
    }, [matches]);
};

export default useTitle;
