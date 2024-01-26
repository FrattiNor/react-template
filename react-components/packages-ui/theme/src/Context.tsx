import useProvider from './useProvider';
import { createContext } from 'react';

type ContextProps = ReturnType<typeof useProvider>;

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;
