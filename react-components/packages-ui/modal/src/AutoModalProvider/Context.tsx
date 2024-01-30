import { createContext } from 'react';

import useProvider from './useProvider';
import { AutoModals } from '../type';

export type ContextProps<M extends AutoModals> = ReturnType<typeof useProvider<M>>;
const Context = createContext<ContextProps<any>>({} as ContextProps<any>);
export default Context;
