import { createContext } from 'react';

import useProvider from './useProvider';

type ContextProps = ReturnType<typeof useProvider>;

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;
