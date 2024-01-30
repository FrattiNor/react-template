import { createContext } from 'react';

import { useQueryProvider } from './QueryProvider';

type ContextProps = ReturnType<typeof useQueryProvider>;

const QueryContext = createContext<ContextProps>({} as ContextProps);

export default QueryContext;
