import type { FC } from 'react';
import { useState } from 'react';

import { DatePicker } from 'antd';

import styles from './index.module.less';
import { disabledDateBeforeLimitAndAfterType, disabledDateAfterLimitAndBeforeType, disabledTimeBeforeLimit, disabledTimeAfterLimit } from './utils';
import { useTranslation } from '../../../Local';
import Template from '../_Template';

import type { Dayjs } from 'dayjs';

type FilterRangerPickerProps = {
    showTime?: boolean;
    closeDropdown: () => void;
    startValue: Dayjs | undefined;
    endValue: Dayjs | undefined;
    reset: () => void;
    disabledType?: 'year' | 'month';
    submit: (value: { startValue: Dayjs | undefined; endValue: Dayjs | undefined }) => void;
};

const RangePicker: FC<FilterRangerPickerProps> = (props) => {
    const { showTime, startValue, endValue, submit: _submit, reset: _reset, closeDropdown, disabledType } = props;

    const { t1 } = useTranslation();

    const [endVisible, setEndVisible] = useState(false);
    const [startVisible, setStartVisible] = useState(false);

    const [innerEndValue, setInnerEndValue] = useState(() => endValue);
    const [innerStartValue, setInnerStartValue] = useState(() => startValue);

    const couldSubmit = !!((innerStartValue && innerEndValue) || (!innerStartValue && !innerEndValue));

    const submit = () => {
        _submit({
            startValue: showTime ? innerStartValue : innerStartValue?.startOf('days'),
            endValue: showTime ? innerEndValue : innerEndValue?.endOf('days'),
        });
        if (closeDropdown) closeDropdown();
    };

    const reset = () => {
        _reset();
        closeDropdown();
    };

    const startDisabledDate = (current: Dayjs) => disabledDateAfterLimitAndBeforeType(current, innerEndValue, disabledType);

    const endDisabledDate = (current: Dayjs) => disabledDateBeforeLimitAndAfterType(current, innerStartValue, disabledType);

    const startDisabledTime = (current: Dayjs) => disabledTimeAfterLimit(current, innerEndValue);

    const endDisabledTime = (current: Dayjs) => disabledTimeBeforeLimit(current, innerStartValue);

    return (
        <Template width={250} submit={submit} reset={reset} submitDisabled={!couldSubmit}>
            <div className={styles['range-picker']}>
                <div>
                    <span>{t1('package@table.start_time')}</span>
                    <span> {':'}</span>
                    <DatePicker
                        allowClear
                        showNow={false}
                        showTime={showTime}
                        open={startVisible}
                        value={innerStartValue}
                        style={{ width: '100%' }}
                        onOpenChange={setStartVisible}
                        disabledDate={disabledType ? startDisabledDate : undefined}
                        disabledTime={disabledType ? startDisabledTime : undefined}
                        onChange={(value) => {
                            setInnerStartValue(value);
                            if (!innerEndValue) setEndVisible(true);
                        }}
                    />
                </div>
                <div>
                    <span>{t1('package@table.end_time')}</span>
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
                        disabledDate={disabledType ? endDisabledDate : undefined}
                        disabledTime={disabledType ? endDisabledTime : undefined}
                    />
                </div>
            </div>
        </Template>
    );
};

export default RangePicker;
