import { useMergeState } from '@react/hooks';
import styles from './index.module.less';
import { CheckboxProps } from '../type';
import { useTheme } from '@pkg/theme';
import classNames from 'classnames';
import { FC } from 'react';

const Checkbox: FC<CheckboxProps> = (props) => {
    const { themeClassName } = useTheme();
    const { disabled, indeterminate, className, onClick } = props;

    const [_checked, setChecked] = useMergeState({
        defaultValue: false,
        state: props.checked,
        setState: props.onChange,
    });

    const checked = indeterminate ? false : _checked;

    return (
        <div
            onClick={(e) => {
                if (typeof onClick === 'function') onClick(e);
                if (!disabled) setChecked(!checked);
            }}
            className={classNames(themeClassName, styles['checkbox'], className, {
                [styles['checked']]: checked,
                [styles['disabled']]: disabled,
                [styles['indeterminate']]: indeterminate,
            })}
        />
    );
};

export default Checkbox;
