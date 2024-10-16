import { useRef, useState } from 'react';

import { type ThemeProps, type Theme } from './type';

const useProvider = ({ theme: _theme = 'light' }: ThemeProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [theme, setTheme] = useState<Theme>(_theme);
	return { theme, setTheme, containerRef };
};

export default useProvider;
