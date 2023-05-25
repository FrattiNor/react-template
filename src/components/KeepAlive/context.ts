/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { ContextProps } from './type';

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;
