import styles from './theme.module.less';
import { Props, Theme } from './type';
import { useState } from 'react';

const useData = ({ theme: _theme = 'light' }: Props) => {
    const [theme, setTheme] = useState<Theme>(_theme);
    const themeClassName = styles[theme];
    const applyClassName = styles['apply-theme'];
    return { theme, setTheme, themeClassName, applyClassName };
};

export default useData;
