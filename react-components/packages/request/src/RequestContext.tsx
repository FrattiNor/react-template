import { createContext } from 'react';

import { useRequestProvider } from './RequestProvider';

type ContextProps = ReturnType<typeof useRequestProvider>;

const RequestContext = createContext<ContextProps>({} as ContextProps);

export default RequestContext;
