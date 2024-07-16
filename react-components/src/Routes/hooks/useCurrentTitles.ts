import { useMemo } from 'react';
import { useMatches } from 'react-router-dom';

import type { RouteHandle } from '../type';

const useCurrentTitles = () => {
    const matches = useMatches();

    return useMemo(() => {
        const titles: { pathname: string; title: string; customData?: any }[] = [];
        matches.forEach((item) => {
            const { title, menuType, customData } = item.handle as RouteHandle;
            if (menuType !== 'layout' && menuType !== 'group' && typeof title === 'string' && title !== '') {
                titles.push({
                    title,
                    customData,
                    pathname: item.pathname,
                });
            }
        });
        return titles;
    }, [matches]);
};

export default useCurrentTitles;
