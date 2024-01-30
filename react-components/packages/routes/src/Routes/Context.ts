import { createContext } from 'react';

import { RouteItem } from '../type';

const Context = createContext<{ routes: RouteItem[] }>({ routes: [] });

export default Context;
