import { Input, InputNumber, Radio, Select } from 'antd';
import { FC, useContext, useMemo } from 'react';
import { getNumByStr } from '../../utils';
import styles from './index.module.less';
import CronContext from '../../Context';

const unit = '天';

const Day: FC = () => {
    const { radioValue, periodValue, loopValue, pointValue, setRadioValue, setPeriodValue, setLoopValue, setPointValue, dayType, setDayType } =
        useContext(CronContext);

    const max = useMemo(() => (dayType === 'day' ? 31 : 7), [dayType]);

    const radioChange = (v: number) => {
        console.log(typeof v);
        setRadioValue((b) => ({ ...b, [dayType]: v }));
    };

    const periodChange = (v: { [key: string]: number }) => {
        setPeriodValue((b) => ({ ...b, [dayType]: { ...b[dayType], ...v } }));
    };

    const loopChange = (v: { [key: string]: number }) => {
        setLoopValue((b) => ({ ...b, [dayType]: { ...b[dayType], ...v } }));
    };

    const pointChange = (v: string) => {
        setPointValue((b) => ({ ...b, [dayType]: v }));
    };

    return (
        <div className={styles['wrapper']}>
            <Select
                size="small"
                value={dayType}
                onChange={setDayType}
                style={{ width: 100, marginBottom: 8 }}
                options={[
                    { label: '按月算', value: 'day' },
                    { label: '按周算', value: 'week' },
                ]}
            />
            <Radio.Group value={radioValue[dayType]} onChange={(e) => radioChange(e.target.value)}>
                <Radio className={styles['radio']} value={1}>
                    <span>每{unit}执行</span>
                </Radio>
                <Radio className={styles['radio']} value={2}>
                    <span>从</span>
                    <InputNumber
                        min={1}
                        max={max}
                        size="small"
                        controls={false}
                        value={periodValue[dayType].min}
                        className={styles['input-number']}
                        onChange={(v) => periodChange({ min: getNumByStr(`${v}`) })}
                    />
                    <span>到</span>
                    <InputNumber
                        min={1}
                        max={max}
                        size="small"
                        controls={false}
                        value={periodValue[dayType].max}
                        className={styles['input-number']}
                        onChange={(v) => periodChange({ max: getNumByStr(`${v}`) })}
                    />
                    <span>{unit}</span>
                </Radio>
                <Radio className={styles['radio']} value={3}>
                    <span>从</span>
                    <InputNumber
                        min={1}
                        max={max}
                        size="small"
                        controls={false}
                        value={loopValue[dayType].start}
                        className={styles['input-number']}
                        onChange={(v) => loopChange({ start: getNumByStr(`${v}`) })}
                    />
                    <span>{unit}开始，每</span>
                    <InputNumber
                        min={1}
                        max={max}
                        size="small"
                        controls={false}
                        value={loopValue[dayType].end}
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
                    value={pointValue[dayType]}
                    className={styles['input-textarea']}
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    onChange={(e) => pointChange(e.target.value)}
                />
            </Radio.Group>
        </div>
    );
};

export default Day;
