import { createContext } from 'react';
import { ContextProps } from './type';

const Context2 = createContext<ContextProps>({} as ContextProps);

export default Context2;
