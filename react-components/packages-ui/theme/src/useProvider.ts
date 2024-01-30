import { useState } from 'react';

import styles from './theme.module.less';
import { ThemeProps, Theme } from './type';

const useProvider = ({ theme: _theme = 'light' }: ThemeProps) => {
    const [theme, setTheme] = useState<Theme>(_theme);
    const themeClassName = styles[theme];
    const applyClassName = styles['apply-theme'];
    const applyClassNameWithBg = styles['apply-theme-bg'];
    return { theme, setTheme, themeClassName, applyClassName, applyClassNameWithBg };
};

export default useProvider;
