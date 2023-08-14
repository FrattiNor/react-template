import { CronType, LoopValue, PeriodValue } from '../../type';
import { FC, Fragment, ReactNode, useContext } from 'react';
import { InputNumber, Radio, notification } from 'antd';
import CheckboxGroup from './CheckboxGroup';
import { getNumByStr } from '../../utils';
import styles from './index.module.less';
import CronContext from '../../Context';

type Props = {
    unit: string;
    type: CronType;
    max: number;
    inputMax?: number;
    min: number;
    inputMin?: number;
    Select?: ReactNode;
    checkboxItemWidth?: number;
    checkboxGroupHeight?: number;
    SpecificPicker?: ReactNode;
};

const Normal: FC<Props> = ({
    unit,
    type,
    max,
    inputMax = max,
    min,
    inputMin = min,
    Select,
    checkboxItemWidth,
    checkboxGroupHeight,
    SpecificPicker,
}) => {
    const { radioValue, periodValue, loopValue, pointValue, setRadioValue, setPeriodValue, setLoopValue, setPointValue } = useContext(CronContext);

    const [notificationApi, contextHolder] = notification.useNotification();

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
        if (v.length > 0) {
            setPointValue((b) => ({ ...b, [type]: v }));
        } else {
            notificationApi.error({ message: `具体${unit}数至少保留一位！` });
        }
    };

    return (
        <Fragment>
            <div className={styles['wrapper']}>
                <Fragment>{Select}</Fragment>

                <Radio.Group className={styles['radio-group']} value={radioValue[type]} onChange={(e) => radioChange(e.target.value)}>
                    <Radio className={styles['radio']} value={1}>
                        <span>每{unit}执行</span>
                    </Radio>
                    <Radio className={styles['radio']} value={2}>
                        <span>周期从</span>
                        <InputNumber
                            min={inputMin}
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
                            max={inputMax}
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
                            min={inputMin}
                            max={inputMax}
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
                            max={inputMax}
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
                    {SpecificPicker || (
                        <CheckboxGroup
                            max={max}
                            min={min}
                            onChange={pointChange}
                            value={pointValue[type]}
                            disabled={radioValue[type] !== 4}
                            checkboxItemWidth={checkboxItemWidth}
                            checkboxGroupHeight={checkboxGroupHeight}
                        />
                    )}
                </Radio.Group>
            </div>

            {contextHolder}
        </Fragment>
    );
};

export default Normal;
