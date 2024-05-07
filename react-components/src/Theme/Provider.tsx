import type { FC, PropsWithChildren } from 'react';

import classNames from 'classnames';

import Context from './Context';
import styles from './styles/theme.module.less';
import useProvider from './useProvider';

import type { ThemeProps } from './type';

const Provider: FC<PropsWithChildren<ThemeProps>> = ({ children, ...props }) => {
    const value = useProvider(props);
    const { container } = props;
    const { containerRef, theme } = value;
    const containerProps = container === true ? {} : container;
    const { withBg, className, minHeight, minWidth } = containerProps;

    return (
        <Context.Provider value={value}>
            <div
                ref={containerRef}
                className={classNames(
                    styles[theme],
                    styles['theme-container'],
                    withBg === true ? styles['apply-theme-bg'] : styles['apply-theme'],
                    className,
                )}
            >
                <div className={styles['theme-container-inner']} style={{ minHeight, minWidth }}>
                    {children}
                </div>
            </div>
        </Context.Provider>
    );
};

export default Provider;
