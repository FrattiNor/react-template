import { createContext } from 'react';
import useData from './useData';

type ContextProps = ReturnType<typeof useData>;

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;
