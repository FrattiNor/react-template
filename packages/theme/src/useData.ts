import styles from './theme.module.less';
import { useState } from 'react';
import { Theme } from './type';

type Props = {
    theme?: Theme;
};

const useData = ({ theme: _theme = 'light' }: Props) => {
    const [theme, setTheme] = useState(_theme);
    const themeClassName = styles[theme];
    const applyClassName = styles['apply-theme'];
    return { theme, setTheme, themeClassName, applyClassName };
};

export default useData;
