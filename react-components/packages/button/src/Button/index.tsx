import { LoadingCircle } from '@pkg/widgets';
import styles from './index.module.less';
import { ButtonProps } from '../type';
import { useTheme } from '@pkg/theme';
import classNames from 'classnames';
import { forwardRef } from 'react';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { themeClassName, applyClassName } = useTheme();
    const { className, style, children, onClick, disabled, loading, ghost, icon, type = 'default' } = props;

    return (
        <button
            ref={ref}
            style={style}
            onClick={(e) => !disabled && !loading && onClick && onClick(e)}
            className={classNames(styles['button'], styles[type], className, themeClassName, applyClassName, {
                [styles['ghost']]: ghost,
                [styles['loading']]: loading,
                [styles['not-loading']]: !loading,
                [styles['disabled']]: disabled,
                [styles['not-disabled']]: !disabled,
            })}
        >
            {loading ? <LoadingCircle /> : icon}
            {children}
        </button>
    );
});

export default Button;
