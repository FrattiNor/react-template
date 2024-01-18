import styles from './theme.module.less';
import { ThemeProps, Theme } from './type';
import { useState } from 'react';

const useProvider = ({ theme: _theme = 'light' }: ThemeProps) => {
    const [theme, setTheme] = useState<Theme>(_theme);
    const themeClassName = styles[theme];
    const applyClassName = styles['apply-theme'];
    const applyBgClassName = styles['apply-bg-theme'];
    return { theme, setTheme, themeClassName, applyClassName, applyBgClassName };
};

export default useProvider;
