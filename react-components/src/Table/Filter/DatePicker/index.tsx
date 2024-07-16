import type { FC } from 'react';
import { useState } from 'react';

import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import styles from './index.module.less';
import Template from '../_Template';
import { disabledDateAfterLimit, disabledTimeAfterLimit } from '../RangePicker/utils';

import type { Dayjs } from 'dayjs';

type FilterRangerPickerProps = {
    showTime?: boolean;
    closeDropdown: () => void;
    value: Dayjs | undefined;
    submit: (nextValue: Dayjs | undefined) => void;
    reset: () => void;
    disabledType?: 'afterNow';
};

const DatePickerFC: FC<FilterRangerPickerProps> = (props) => {
    const { showTime, value, submit: _submit, reset: _reset, closeDropdown, disabledType } = props;

    const [now] = useState(() => dayjs());

    const [visible, setVisible] = useState(false);

    const [innerValue, setInnerValue] = useState(() => value);

    const submit = () => {
        _submit(showTime ? innerValue : innerValue?.startOf('days'));
        if (closeDropdown) closeDropdown();
    };

    const reset = () => {
        _reset();
        closeDropdown();
    };

    const disabledDate = (current: Dayjs) => disabledDateAfterLimit(current, now);

    const disabledTime = (current: Dayjs) => disabledTimeAfterLimit(current, now);

    return (
        <Template width={250} submit={submit} reset={reset}>
            <div className={styles['date-picker']}>
                <DatePicker
                    allowClear
                    open={visible}
                    showNow={false}
                    value={innerValue}
                    showTime={showTime}
                    onChange={setInnerValue}
                    onOpenChange={setVisible}
                    style={{ width: '100%' }}
                    disabledDate={disabledType === 'afterNow' ? disabledDate : undefined}
                    disabledTime={disabledType === 'afterNow' ? disabledTime : undefined}
                />
            </div>
        </Template>
    );
};

export default DatePickerFC;
