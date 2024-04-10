import type { FC } from 'react';
import { useState } from 'react';

import { DatePicker } from 'antd';

import styles from './index.module.less';
import { useTranslation } from '../../../Local';
import Template from '../_Template';
import type { Dayjs } from 'dayjs';

type FilterRangerPickerProps = {
    showTime?: boolean;
    afterSubmit?: () => void;
    startValue: Dayjs | undefined;
    setStartValue: (nextValue: Dayjs | undefined) => void;
    endValue: Dayjs | undefined;
    setEndValue: (nextValue: Dayjs | undefined) => void;
    disabledType?: 'year' | 'month';
};

const RangePicker: FC<FilterRangerPickerProps> = ({ showTime, startValue, setStartValue, endValue, setEndValue, afterSubmit, disabledType }) => {
    const { t1 } = useTranslation();

    const [endVisible, setEndVisible] = useState(false);
    const [startVisible, setStartVisible] = useState(false);

    const [innerEndValue, setInnerEndValue] = useState(() => endValue);
    const [innerStartValue, setInnerStartValue] = useState(() => startValue);

    const haveValue = !!(innerStartValue || innerEndValue);
    const couldSubmit = !!((innerStartValue && innerEndValue) || (!innerStartValue && !innerEndValue));

    const submit = () => {
        setEndValue(showTime ? innerEndValue : innerEndValue?.endOf('days'));
        setStartValue(showTime ? innerStartValue : innerStartValue?.startOf('days'));
        if (afterSubmit) afterSubmit();
    };

    const reset = () => {
        setInnerStartValue(undefined);
        setInnerEndValue(undefined);
    };

    const startDisabledDate = (current: Dayjs) => {
        if (innerEndValue) {
            // 存在限制类型【year,month】
            if (disabledType) {
                // 早于结束时间，至少1【年，月】【同年同天，或者同月同天】
                const tooEarly = innerEndValue.startOf('day').diff(current.startOf('day').add(1, 'day'), disabledType) >= 1;
                // 开始时间太早了【禁用】
                if (tooEarly === true) return true;
            }
            // 结束时间是一天的开始
            const endIsStartOfDay = innerEndValue.startOf('day').diff(innerEndValue, 'second') === 0;
            // 小于等于结束同一天【如果 结束时间是一天的开始，那么不能等于结束同一天】
            const notBeforeEnd = !(innerEndValue.startOf('day').diff(current.startOf('day'), 'day') >= (endIsStartOfDay ? 1 : 0));
            // 没有早于结束时间【禁用】
            if (notBeforeEnd === true) return true;
        }
        return false;
    };

    const endDisabledDate = (current: Dayjs) => {
        if (innerStartValue) {
            // 存在限制类型【year,month】
            if (disabledType) {
                // 晚于开始时间，至少1【年，月】【同年同天，或者同月同天】
                const tooLate = current.startOf('day').diff(innerStartValue.startOf('day').add(1, 'day'), disabledType) >= 1;
                // 结束时间太晚了【禁用】
                if (tooLate === true) return true;
            }
            // 开始时间是一天的结束
            const startIsEndOfDay = innerStartValue.endOf('day').diff(innerStartValue, 'second') === 0;
            // 大于等于开始同一天【如果 开始时间是一天的结束，那么不能等于开始同一天】
            const notAfterStart = !(current.startOf('day').diff(innerStartValue.startOf('day'), 'day') >= (startIsEndOfDay ? 1 : 0));
            // 没有晚于开始时间【禁用】
            if (notAfterStart === true) return true;
        }
        return false;
    };

    const startDisabledTime = (current: Dayjs) => {
        if (innerEndValue) {
            // 是同一天
            const isSameDay = innerEndValue.startOf('day').diff(current.startOf('day'), 'day') === 0;

            const endHour = innerEndValue.get('hour');
            const endMinute = innerEndValue.get('minute');
            const endSecond = innerEndValue.get('second');

            if (isSameDay) {
                return {
                    disabledHours: () => {
                        return range('[', endMinute === 0 && endSecond === 0 ? endHour : endHour + 1, 24, ')');
                    },
                    disabledMinutes: (hour: number) => {
                        return hour === endHour ? range('[', endSecond === 0 ? endMinute : endMinute + 1, 60, ')') : [];
                    },
                    disabledSeconds: (hour: number, minute: number) => {
                        return hour === endHour && minute === endMinute ? range('[', endSecond, 60, ')') : [];
                    },
                };
            }
        }

        return {
            disabledHours: () => [],
            disabledMinutes: () => [],
            disabledSeconds: () => [],
        };
    };

    const endDisabledTime = (current: Dayjs) => {
        if (innerStartValue) {
            // 是同一天
            const isSameDay = current.startOf('day').diff(innerStartValue.startOf('day'), 'day') === 0;

            const startHour = innerStartValue.get('hour');
            const startMinute = innerStartValue.get('minute');
            const startSecond = innerStartValue.get('second');

            if (isSameDay) {
                return {
                    disabledHours: () => {
                        return range('(', -1, startMinute === 59 && startSecond === 59 ? startHour : startHour - 1, ']');
                    },
                    disabledMinutes: (hour: number) => {
                        return hour === startHour ? range('(', -1, startSecond === 59 ? startMinute : startMinute - 1, ']') : [];
                    },
                    disabledSeconds: (hour: number, minute: number) => {
                        return hour === startHour && minute === startMinute ? range('(', -1, startSecond, ']') : [];
                    },
                };
            }
        }

        return {
            disabledHours: () => [],
            disabledMinutes: () => [],
            disabledSeconds: () => [],
        };
    };

    return (
        <Template width={250} submit={submit} reset={reset} resetDisabled={!haveValue} submitDisabled={!couldSubmit}>
            <div className={styles['range-picker']}>
                <div>
                    <span>{t1('package_ui@table.start_time')}</span>
                    <span> {':'}</span>
                    <DatePicker
                        allowClear
                        showNow={false}
                        showTime={showTime}
                        open={startVisible}
                        value={innerStartValue}
                        style={{ width: '100%' }}
                        onOpenChange={setStartVisible}
                        disabledDate={startDisabledDate}
                        disabledTime={startDisabledTime}
                        onChange={(value) => {
                            setInnerStartValue(value);
                            if (!innerEndValue) setEndVisible(true);
                        }}
                    />
                </div>
                <div>
                    <span>{t1('package_ui@table.end_time')}</span>
                    <span> {':'}</span>
                    <DatePicker
                        allowClear
                        showNow={false}
                        open={endVisible}
                        showTime={showTime}
                        value={innerEndValue}
                        style={{ width: '100%' }}
                        onChange={setInnerEndValue}
                        onOpenChange={setEndVisible}
                        disabledDate={endDisabledDate}
                        disabledTime={endDisabledTime}
                    />
                </div>
            </div>
        </Template>
    );
};

const range = (startFlag: '[' | '(', start: number, end: number, endFlag: ']' | ')') => {
    const res: number[] = [];
    const includeEnd = endFlag === ']';
    const includeStart = startFlag === '[';
    for (let i = includeStart ? start : start + 1; i <= (includeEnd ? end : end - 1); i++) {
        res.push(i);
    }
    return res;
};

export default RangePicker;
