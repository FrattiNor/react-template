import styles from './theme.module.less';
import { useContext } from 'react';
import Context from './Context';

const useTheme = () => {
    const contextValue = useContext(Context);
    const { theme, setTheme, fontFamily, themeClassName, applyClassName, applyClassNameWithBg } = contextValue;

    return {
        fontFamily,
        theme: theme ?? 'light',
        setTheme: setTheme ?? ((v) => v),
        themeClassName: themeClassName ?? styles['light'],
        applyClassName: applyClassName ?? styles['apply-theme'],
        applyClassNameWithBg: applyClassNameWithBg ?? styles['apply-theme-bg'],
    };
};

export default useTheme;
