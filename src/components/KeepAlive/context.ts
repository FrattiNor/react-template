import { createContext } from 'react-activation';
import { ContextProps } from './type';

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;
