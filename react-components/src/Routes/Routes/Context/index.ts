import { createContext, useMemo } from 'react';

import getRouteObjectArray from './getRouteObjectArray';
import { type RouteItem } from '../../type';

const useProvider = (routes: RouteItem[]) => {
	return {
		routeObjects: useMemo(() => getRouteObjectArray(routes), [routes]),
	};
};

const Context = createContext<ReturnType<typeof useProvider>>({ routeObjects: [] });

export { useProvider };
export default Context;
