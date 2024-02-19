import { useState } from 'react';

import styles from './theme.module.less';
import { ThemeProps, Theme } from './type';

const useProvider = ({ theme: _theme = 'light' }: ThemeProps) => {
    const [theme, setTheme] = useState<Theme>(_theme);
    const themeClassName = styles[theme];
    const applyTheme = styles['apply-theme'];
    const applyThemeWithBg = styles['apply-theme-bg'];
    return { theme, setTheme, themeClassName, applyTheme, applyThemeWithBg };
};

export default useProvider;
