import { CronType, LoopValue, PeriodValue } from '../../type';
import { FC, Fragment, ReactNode, useContext } from 'react';
import { Input, InputNumber, Radio } from 'antd';
import { getNumByStr } from '../../useData';
import styles from './index.module.less';
import CronContext from '../../Context';

type Props = { unit: string; type: CronType; max: number; min: number; Select?: ReactNode };

const Normal: FC<Props> = ({ unit, type, max, min, Select }) => {
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

    const pointChange = (v: string) => {
        setPointValue((b) => ({ ...b, [type]: v }));
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
                        max={periodValue[type].end - 1}
                        size="small"
                        controls={false}
                        value={periodValue[type].start}
                        className={styles['input-number']}
                        onChange={(v) => periodChange({ start: getNumByStr(`${v}`) })}
                    />
                    <span>到</span>
                    <InputNumber
                        min={periodValue[type].start + 1}
                        max={max}
                        size="small"
                        controls={false}
                        value={periodValue[type].end}
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
                        className={styles['input-number']}
                        onChange={(v) => loopChange({ loop: getNumByStr(`${v}`) })}
                    />
                    <span>{unit}执行</span>
                </Radio>
                <Radio className={styles['radio']} value={4}>
                    <span>具体{unit}数</span>
                    <span className={styles['notice-text']}>{`（逗号分隔的${unit}数）`}</span>
                </Radio>
                <Input.TextArea
                    value={pointValue[type]}
                    className={styles['input-textarea']}
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    onChange={(e) => pointChange(e.target.value)}
                />
            </Radio.Group>
        </div>
    );
};

export default Normal;
