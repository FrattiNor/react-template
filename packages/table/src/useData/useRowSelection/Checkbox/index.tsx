import styles from './index.module.less';
import { FC, useState } from 'react';
import classNames from 'classnames';

type Props = {
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    onChange?: (c: boolean) => void;
};

const Checkbox: FC<Props> = (props) => {
    const { disabled, indeterminate } = props;
    const [_checked, _setChecked] = useState(false);
    const checked = indeterminate ? false : props.checked ?? _checked;
    const setChecked = props.onChange ?? _setChecked;

    return (
        <div
            onClick={() => !disabled && setChecked(!checked)}
            className={classNames(styles['checkbox'], {
                [styles['checked']]: checked,
                [styles['disabled']]: disabled,
                [styles['indeterminate']]: indeterminate,
            })}
        >
            {checked && <div className={styles['checked-animate']} />}
        </div>
    );
};

export default Checkbox;
