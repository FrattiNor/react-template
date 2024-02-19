import { useContext } from 'react';

import Context from './Context';
import styles from './theme.module.less';

const useTheme = () => {
    const contextValue = useContext(Context);
    const { theme, setTheme, themeClassName, applyTheme, applyThemeWithBg } = contextValue;

    return {
        theme: theme ?? 'light',
        setTheme: setTheme ?? ((v) => v),
        themeClassName: themeClassName ?? styles['light'],
        applyTheme: applyTheme ?? styles['apply-theme'],
        applyThemeWithBg: applyThemeWithBg ?? styles['apply-theme-bg'],
    };
};

export default useTheme;
