import { FC, MouseEventHandler } from 'react';
import { useMergeState } from '@react/hooks';
import styles from './index.module.less';
import { CheckboxProps } from '../type';
import { useTheme } from '@pkg/theme';
import classNames from 'classnames';

const Checkbox: FC<CheckboxProps> = (props) => {
    const { themeClassName } = useTheme();
    const { disabled, indeterminate, className, onClick, children } = props;

    const [_checked, setChecked] = useMergeState({
        defaultValue: false,
        state: props.checked,
        setState: props.onChange,
    });

    const checked = indeterminate ? false : _checked;

    const haveChildren = !!children;

    const clickFun: MouseEventHandler<HTMLDivElement> = (e) => {
        if (typeof onClick === 'function') onClick(e);
        if (!disabled) setChecked(!checked);
    };

    const checkboxDom = (
        <div
            // 有children时使用外部的点击
            onClick={(e) => !haveChildren && clickFun(e)}
            className={classNames(themeClassName, styles['checkbox'], className, {
                [styles['checked']]: checked,
                [styles['disabled']]: disabled,
                [styles['indeterminate']]: indeterminate,
            })}
        />
    );

    if (!haveChildren) return checkboxDom;

    return (
        <div onClick={clickFun} className={styles['checkbox-wrapper']}>
            {checkboxDom}
            {children}
        </div>
    );
};

export default Checkbox;
