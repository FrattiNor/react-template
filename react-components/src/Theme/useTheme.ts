import { useContext, useRef } from 'react';

import Context from './Context';

const useTheme = () => {
	const ref = useRef(null);
	const contextValue = useContext(Context);
	const { theme, setTheme, containerRef } = contextValue;

	return {
		theme: theme ?? 'light',
		setTheme: setTheme ?? ((v) => v),
		containerRef: containerRef ?? ref,
	};
};

export default useTheme;
