import { createContext } from 'react';
import { ContextProps } from './type';

const Context = createContext<ContextProps>({ width: {}, style: {}, className: {} });

export default Context;
