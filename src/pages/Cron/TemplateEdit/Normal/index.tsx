import { Input, InputNumber, Radio } from 'antd';
import { getNumByStr } from '../../utils';
import styles from './index.module.less';
import CronContext from '../../Context';
import { FC, useContext } from 'react';
import { CronType } from '../../type';

const Normal: FC<{ unit: string; type: CronType; max: number; min: number }> = ({ unit, type, max, min }) => {
    const { radioValue, periodValue, loopValue, pointValue, setRadioValue, setPeriodValue, setLoopValue, setPointValue } = useContext(CronContext);

    const radioChange = (v: number) => {
        console.log(typeof v);
        setRadioValue((b) => ({ ...b, [type]: v }));
    };

    const periodChange = (v: { [key: string]: number }) => {
        setPeriodValue((b) => ({ ...b, [type]: { ...b[type], ...v } }));
    };

    const loopChange = (v: { [key: string]: number }) => {
        setLoopValue((b) => ({ ...b, [type]: { ...b[type], ...v } }));
    };

    const pointChange = (v: string) => {
        setPointValue((b) => ({ ...b, [type]: v }));
    };

    return (
        <div className={styles['wrapper']}>
            <Radio.Group value={radioValue[type]} onChange={(e) => radioChange(e.target.value)}>
                <Radio className={styles['radio']} value={1}>
                    <span>每{unit}执行</span>
                </Radio>
                <Radio className={styles['radio']} value={2}>
                    <span>从</span>
                    <InputNumber
                        min={min}
                        max={max}
                        size="small"
                        controls={false}
                        value={periodValue[type].min}
                        className={styles['input-number']}
                        onChange={(v) => periodChange({ min: getNumByStr(`${v}`) })}
                    />
                    <span>到</span>
                    <InputNumber
                        min={min}
                        max={max}
                        size="small"
                        controls={false}
                        value={periodValue[type].max}
                        className={styles['input-number']}
                        onChange={(v) => periodChange({ max: getNumByStr(`${v}`) })}
                    />
                    <span>{unit}</span>
                </Radio>
                <Radio className={styles['radio']} value={3}>
                    <span>从</span>
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
                        value={loopValue[type].end}
                        className={styles['input-number']}
                        onChange={(v) => loopChange({ end: getNumByStr(`${v}`) })}
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
