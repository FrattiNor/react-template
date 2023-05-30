import { Dispatch, SetStateAction, createContext } from 'react';

export type Type = 'history' | 'realtime';

type ContextProps = { type: Type; setType: Dispatch<SetStateAction<Type>> };

const SwitchContext = createContext<ContextProps>({} as ContextProps);

export default SwitchContext;
