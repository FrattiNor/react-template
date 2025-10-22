import { createContext, useContext, useState } from 'react';

export const AppTableContext = createContext({} as ReturnType<typeof useProvider>);

export const useAppTableContext = () => useContext(AppTableContext);

export const useProvider = () => {
	const [params, setParams] = useState<Record<string, any>>({});
	return { params, setParams };
};
