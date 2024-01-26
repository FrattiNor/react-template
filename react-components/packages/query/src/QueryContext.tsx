import { useQueryProvider } from './QueryProvider';
import { createContext } from 'react';

type ContextProps = ReturnType<typeof useQueryProvider>;

const QueryContext = createContext<ContextProps>({} as ContextProps);

export default QueryContext;
