import { type FC, type PropsWithChildren } from 'react';

import Context from './Context';
import useProvider from './useProvider';

const Provider: FC<PropsWithChildren> = ({ children }) => {
	const value = useProvider();
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
