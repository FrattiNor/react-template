import { useContext } from 'react';

import Context from './Context';
import styles from './theme.module.less';

const useTheme = () => {
    const contextValue = useContext(Context);
    const { theme, setTheme, themeClassName, applyClassName, applyClassNameWithBg } = contextValue;

    return {
        theme: theme ?? 'light',
        setTheme: setTheme ?? ((v) => v),
        themeClassName: themeClassName ?? styles['light'],
        applyClassName: applyClassName ?? styles['apply-theme'],
        applyClassNameWithBg: applyClassNameWithBg ?? styles['apply-theme-bg'],
    };
};

export default useTheme;
