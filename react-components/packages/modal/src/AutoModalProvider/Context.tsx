import useProvider from './useProvider';
import { createContext } from 'react';
import { AutoModals } from '../type';

export type ContextProps<M extends AutoModals> = ReturnType<typeof useProvider<M>>;
const Context = createContext<ContextProps<any>>({} as ContextProps<any>);
export default Context;