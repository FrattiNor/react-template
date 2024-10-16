import { useMemo } from 'react';
import { useMatches } from 'react-router-dom';

import { type RouteHandle } from '../type';

type Option = { handleTitle?: (title: string) => string };

const useCurrentTitles = (opt?: Option) => {
	const matches = useMatches();

	const { handleTitle } = opt ?? {};

	return useMemo(() => {
		const titles: { pathname: string; title: string; originPathname: string; customData?: any }[] = [];
		matches.forEach((item) => {
			const { title, menuType, customData, pathname: originPathname } = item.handle as RouteHandle;
			if (menuType !== 'layout' && menuType !== 'group' && typeof title === 'string' && title !== '') {
				titles.push({
					customData,
					originPathname,
					pathname: item.pathname,
					title: handleTitle ? handleTitle(title) : title,
				});
			}
		});
		return titles;
	}, [matches]);
};

export default useCurrentTitles;
