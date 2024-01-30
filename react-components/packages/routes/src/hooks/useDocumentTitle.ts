import { useEffect } from 'react';
import { useMatches } from 'react-router-dom';

const useDocumentTitle = () => {
    const matches = useMatches();

    useEffect(() => {
        let matchIndex = matches.length - 1;
        while (matchIndex >= 0) {
            const lastMatches = matches[matchIndex];
            if ((lastMatches.handle as any)?.index === true) {
                matchIndex--;
            } else {
                const title = (lastMatches.handle as any)?.title;
                if (title) document.title = title;
                break;
            }
        }
    }, [matches]);
};

export default useDocumentTitle;
