import { CronType, LoopValue, PeriodValue } from '../../type';
import { FC, Fragment, ReactNode, useContext } from 'react';
import { Checkbox, InputNumber, Radio } from 'antd';
import { getNumByStr } from '../../useData';
import styles from './index.module.less';
import CronContext from '../../Context';

export const getArray = (count: number, start = 0) => {
    return Array(count)
        .fill('')
        .map((_, i) => {
            return start + i;
        });
};

type Props = { unit: string; type: CronType; max: number; min: number; Select?: ReactNode; checkboxWidth?: number };

const Normal: FC<Props> = ({ unit, type, max, min, Select, checkboxWidth }) => {
    const { radioValue, periodValue, loopValue, pointValue, setRadioValue, setPeriodValue, setLoopValue, setPointValue } = useContext(CronContext);

    const radioChange = (v: number) => {
        setRadioValue((b) => ({ ...b, [type]: v }));
    };

    const periodChange = (v: Partial<PeriodValue>) => {
        setPeriodValue((b) => ({ ...b, [type]: { ...b[type], ...v } }));
    };

    const loopChange = (v: Partial<LoopValue>) => {
        setLoopValue((b) => ({ ...b, [type]: { ...b[type], ...v } }));
    };

    const pointChange = (v: number[]) => {
        if (v.length > 0) setPointValue((b) => ({ ...b, [type]: v }));
    };

    return (
        <div className={styles['wrapper']}>
            <Fragment>{Select}</Fragment>

            <Radio.Group className={styles['radio-group']} value={radioValue[type]} onChange={(e) => radioChange(e.target.value)}>
                <Radio className={styles['radio']} value={1}>
                    <span>每{unit}执行</span>
                </Radio>
                <Radio className={styles['radio']} value={2}>
                    <span>周期从</span>
                    <InputNumber
                        min={min}
                        size="small"
                        controls={false}
                        max={periodValue[type].end - 1}
                        value={periodValue[type].start}
                        disabled={radioValue[type] !== 2}
                        className={styles['input-number']}
                        onChange={(v) => periodChange({ start: getNumByStr(`${v}`) })}
                    />
                    <span>到</span>
                    <InputNumber
                        max={max}
                        size="small"
                        controls={false}
                        value={periodValue[type].end}
                        min={periodValue[type].start + 1}
                        disabled={radioValue[type] !== 2}
                        className={styles['input-number']}
                        onChange={(v) => periodChange({ end: getNumByStr(`${v}`) })}
                    />
                    <span>{unit}</span>
                </Radio>
                <Radio className={styles['radio']} value={3}>
                    <span>周期从</span>
                    <InputNumber
                        min={min}
                        max={max}
                        size="small"
                        controls={false}
                        value={loopValue[type].start}
                        disabled={radioValue[type] !== 3}
                        className={styles['input-number']}
                        onChange={(v) => loopChange({ start: getNumByStr(`${v}`) })}
                    />
                    <span>{unit}开始，每</span>
                    <InputNumber
                        min={1}
                        max={max}
                        size="small"
                        controls={false}
                        value={loopValue[type].loop}
                        disabled={radioValue[type] !== 3}
                        className={styles['input-number']}
                        onChange={(v) => loopChange({ loop: getNumByStr(`${v}`) })}
                    />
                    <span>{unit}执行</span>
                </Radio>
                <Radio className={styles['radio']} value={4}>
                    <span>具体{unit}数</span>
                </Radio>
                <Checkbox.Group
                    value={pointValue[type]}
                    disabled={radioValue[type] !== 4}
                    className={styles['checkbox-group']}
                    onChange={(c) => pointChange(c as number[])}
                >
                    {getArray(max - min + 1, min).map((item) => (
                        <Checkbox key={item} value={item} style={{ width: checkboxWidth }}>
                            {item}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </Radio.Group>
        </div>
    );
};

export default Normal;
