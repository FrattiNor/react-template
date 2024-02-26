import { useMemo } from 'react';
import { useMatches } from 'react-router-dom';

const useCurrentTitles = () => {
    const matches = useMatches();

    return useMemo(() => {
        const titles: { pathname: string; title: string }[] = [];
        matches.forEach((item) => {
            const title = (item.handle as any)?.title;
            if (title) {
                titles.push({
                    title,
                    pathname: item.pathname,
                });
            }
        });
        return titles;
    }, [matches]);
};

export default useCurrentTitles;
