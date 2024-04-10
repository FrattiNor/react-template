import { createContext } from 'react';

import type { AutoModals } from './type';
import type useProvider from './useProvider';

export type ContextProps<M extends AutoModals> = ReturnType<typeof useProvider<M>>;
const Context = createContext<ContextProps<any>>({} as ContextProps<any>);
export default Context;
