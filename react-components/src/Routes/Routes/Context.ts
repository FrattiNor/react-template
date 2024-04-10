import { createContext } from 'react';

import type { RouteItem } from '../type';

const Context = createContext<{ routes: RouteItem[] }>({ routes: [] });

export default Context;
