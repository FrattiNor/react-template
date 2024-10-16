import { type FC, type PropsWithChildren } from 'react';

import Context from './Context';
import { type TranslationProps } from './type';
import useProvider from './useProvider';

const Provider: FC<PropsWithChildren<TranslationProps>> = ({ children, defaultLocal, t1Map, t2Map, coverT1, coverT2 }) => {
	const value = useProvider({ defaultLocal, t1Map, t2Map, coverT1, coverT2 });

	return (
		<Context.Provider value={value} key={value.local}>
			{children}
		</Context.Provider>
	);
};

export default Provider;
