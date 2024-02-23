import { FC, PropsWithChildren } from 'react';

import classNames from 'classnames';

import Context from './Context';
import styles from './theme.module.less';
import { ThemeProps } from './type';
import useProvider from './useProvider';

const Provider: FC<PropsWithChildren<ThemeProps>> = ({ children, ...props }) => {
    const value = useProvider(props);
    const { withBg, container } = props;
    const { themeClassName, applyTheme, applyThemeWithBg } = value;
    return (
        <Context.Provider value={value}>
            {container ? (
                <div className={classNames(themeClassName, styles['theme-container'], withBg ? applyThemeWithBg : applyTheme)}>{children}</div>
            ) : (
                children
            )}
        </Context.Provider>
    );
};

export default Provider;
