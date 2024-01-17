import styles from './index.module.less';
import { CheckboxProps } from '../type';
import { useTheme } from '@pkg/theme';
import { FC, useState } from 'react';
import classNames from 'classnames';

const Checkbox: FC<CheckboxProps> = (props) => {
    const { themeClassName } = useTheme();
    const [_checked, _setChecked] = useState(false);
    const { disabled, indeterminate, className, onClick } = props;
    const checked = indeterminate ? false : props.checked ?? _checked;
    const setChecked = props.onChange ?? _setChecked;

    return (
        <div
            onClick={(e) => {
                if (typeof onClick === 'function') onClick(e);
                if (!disabled) setChecked(!checked);
            }}
            className={classNames(
                styles['checkbox'],
                themeClassName,
                {
                    [styles['disabled']]: disabled,
                    [styles['indeterminate']]: indeterminate,
                    [styles['checked']]: !indeterminate && checked,
                },
                className,
            )}
        />
    );
};

export default Checkbox;
