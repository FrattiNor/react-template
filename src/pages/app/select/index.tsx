import styles from './index.less';

type Props<T extends string | number> = {
    options: { label: string; value: T }[];
    value?: T;
    onChange?: (v: string) => void;
};

function Select<T extends string | number>({ options, value, onChange }: Props<T>) {
    return (
        <select value={value} onChange={(e) => onChange && onChange(e.target.value)} className={styles['select']}>
            {options.map(({ label, value: _value }) => (
                <option key={_value} value={_value}>
                    {label}
                </option>
            ))}
        </select>
    );
}

export default Select;
