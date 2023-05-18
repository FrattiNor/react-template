import { DatePicker, Form } from 'antd-mobile';
import { DatePickItem } from '../../type';
import { useDateUtils } from './utils';
import { FC } from 'react';
import dayjs from 'dayjs';

const FilterDatePicker: FC<DatePickItem> = ({ name, label, placeholder = '请选择日期', format, precision = 'day' }) => {
    const { defaultFormat, renderLabel } = useDateUtils(precision);

    return (
        <Form.Item
            name={name}
            label={label}
            trigger="onConfirm"
            onClick={(_e, datePickerRef) => {
                datePickerRef.current?.open();
            }}
        >
            <DatePicker precision={precision} renderLabel={renderLabel} destroyOnClose>
                {(value) => {
                    return value ? (
                        dayjs(value).format(format || defaultFormat)
                    ) : (
                        <span style={{ color: 'var(--adm-color-light)' }}>{placeholder}</span>
                    );
                }}
            </DatePicker>
        </Form.Item>
    );
};

export default FilterDatePicker;
