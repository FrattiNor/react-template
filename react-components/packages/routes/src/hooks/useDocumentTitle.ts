import { useMatches } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

const useDocumentTitle = () => {
    const matches = useMatches();

    const info = useMemo(() => {
        const lastMatches = matches[matches.length - 1];
        const lastTitle = (lastMatches.handle as any)?.title;
        const title = typeof lastTitle === 'string' ? lastTitle : null;
        return { title };
    }, [matches]);

    useEffect(() => {
        if (info.title) document.title = info.title;
    }, [info.title]);
};

export default useDocumentTitle;
