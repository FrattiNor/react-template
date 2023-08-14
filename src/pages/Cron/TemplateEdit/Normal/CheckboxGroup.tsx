import styles from './index.module.less';
import { Checkbox } from 'antd';

const getArray = (count: number, start = 0) => {
    return Array(count)
        .fill('')
        .map((_, i) => {
            return start + i;
        });
};

type Props = {
    value: number[];
    disabled: boolean;
    onChange: (v: number[]) => void;
    max: number;
    min: number;
    checkboxItemWidth?: number;
    checkboxGroupHeight?: number;
};

const CheckboxGroup = ({ value, disabled, onChange, max, min, checkboxItemWidth = 45, checkboxGroupHeight }: Props) => {
    return (
        <Checkbox.Group
            value={value}
            disabled={disabled}
            className={styles['checkbox-group']}
            style={{ height: checkboxGroupHeight }}
            onChange={(c) => onChange(c as number[])}
        >
            {getArray(max - min + 1, min).map((item) => (
                <Checkbox key={item} value={item} style={{ width: checkboxItemWidth }}>
                    {item}
                </Checkbox>
            ))}
        </Checkbox.Group>
    );
};

export default CheckboxGroup;
