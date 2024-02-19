import { forwardRef } from 'react';

import { useTheme } from '@pkg/theme';
import { LoadingCircle } from '@pkg/widgets';
import classNames from 'classnames';

import styles from './index.module.less';
import { ButtonProps } from '../type';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { themeClassName, applyTheme } = useTheme();
    const { className, style, children, onClick, disabled, loading, ghost, icon, type = 'default', shape = 'default' } = props;

    return (
        <button
            ref={ref}
            style={style}
            onClick={(e) => !disabled && !loading && onClick && onClick(e)}
            className={classNames(styles['button'], styles[`type-${type}`], styles[`shape-${shape}`], className, themeClassName, applyTheme, {
                [styles['ghost']]: ghost,
                [styles['loading']]: loading,
                [styles['not-loading']]: !loading,
                [styles['disabled']]: disabled,
                [styles['not-disabled']]: !disabled,
                [styles['no-children']]: !children,
            })}
        >
            {loading ? <LoadingCircle /> : icon}
            {children}
        </button>
    );
});

export default Button;
