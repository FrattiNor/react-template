import styles from './theme.module.less';
import { useContext } from 'react';
import Context from './Context';

const useTheme = () => {
    const contextValue = useContext(Context);
    const { theme, setTheme, themeClassName, applyClassName } = contextValue;

    return {
        theme: theme ?? 'light',
        setTheme: setTheme ?? ((v) => v),
        themeClassName: themeClassName ?? styles['light'],
        applyClassName: applyClassName ?? styles['apply-theme'],
    };
};

export default useTheme;
