import React from 'react';
import styles from './index.less';

type Props<T extends string | number> = {
    value?: T;
    onChange?: (v: string) => void;
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
};

function Input<T extends string | number>({ value, onChange, type }: Props<T>) {
    return <input value={value} onChange={(e) => onChange && onChange(e.target.value)} className={styles['input']} type={type} />;
}

export default Input;
