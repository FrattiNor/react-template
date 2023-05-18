import { PickerActions } from 'antd-mobile/es/components/picker';
import { useDateUtils } from '../DatePicker/utils';
import { DatePicker, Form } from 'antd-mobile';
import { RangPickItem } from '../../type';
import { FC, useRef } from 'react';
import dayjs from 'dayjs';

const FilterRangPicker: FC<RangPickItem> = ({ name, label, format, precision = 'day', placeholder = ['请选择日期', '请选择日期'] }) => {
    const handleRef = useRef<number>(0);
    const startRef = useRef<PickerActions>(null);
    const endRef = useRef<PickerActions>(null);

    const { defaultFormat, distance, renderLabel } = useDateUtils(precision);

    return (
        <Form.Subscribe to={name}>
            {(subscribeValue) => {
                const start = subscribeValue[name[0]];
                const end = subscribeValue[name[1]];

                const list = [
                    {
                        ref: startRef,
                        nextRef: endRef,
                        _name: name[0],
                        _label: label[0],
                        _precision: precision,
                        _placeholder: placeholder[0],
                        max: end ? distance(end, 'subtract') : undefined,
                        _format: Array.isArray(format) ? format[0] : format || defaultFormat,
                    },
                    {
                        ref: endRef,
                        nextRef: startRef,
                        _name: name[1],
                        _label: label[1],
                        _precision: precision,
                        _placeholder: placeholder[1],
                        min: start ? distance(start, 'add') : undefined,
                        _format: Array.isArray(format) ? format[1] : format || defaultFormat,
                    },
                ];

                return list.map(({ ref, nextRef, max, min, _name, _label, _placeholder, _format, _precision }) => (
                    <Form.Item
                        key={_name}
                        name={_name}
                        label={_label}
                        trigger="onConfirm"
                        onClick={(_e, datePickerRef) => {
                            datePickerRef.current?.open();
                        }}
                    >
                        <DatePicker
                            ref={ref}
                            max={max}
                            min={min}
                            title={_label}
                            destroyOnClose
                            precision={_precision}
                            renderLabel={renderLabel}
                            onCancel={() => {
                                handleRef.current = 0;
                            }}
                            onConfirm={() => {
                                handleRef.current++;
                                if (handleRef.current < 2) {
                                    nextRef.current?.open();
                                } else {
                                    handleRef.current = 0;
                                }
                            }}
                        >
                            {(value) => {
                                return value ? dayjs(value).format(_format) : <span style={{ color: 'var(--adm-color-light)' }}>{_placeholder}</span>;
                            }}
                        </DatePicker>
                    </Form.Item>
                ));
            }}
        </Form.Subscribe>
    );
};

export default FilterRangPicker;
