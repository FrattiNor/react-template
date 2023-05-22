import { DatePicker, Form } from 'antd-mobile';
import { DatePickItem } from '../../type';
import Clear from '../_components/Clear';
import { useDateUtils } from './utils';
import { FC } from 'react';
import dayjs from 'dayjs';

const FilterDatePicker: FC<DatePickItem> = ({ name, label, placeholder = '请选择日期', format, precision = 'day' }) => {
    const { defaultFormat, renderLabel } = useDateUtils(precision);

    return (
        <Form.Subscribe to={[name]}>
            {(subscribeValue, form) => {
                const currentValue = subscribeValue[name];

                // 清除箭头
                const arrow = currentValue ? <Clear clear={() => form.setFieldsValue({ [name]: null })} /> : true;

                return (
                    <Form.Item
                        name={name}
                        label={label}
                        arrow={arrow}
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
            }}
        </Form.Subscribe>
    );
};

export default FilterDatePicker;
