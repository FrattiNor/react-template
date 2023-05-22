import { PickerActions } from 'antd-mobile/es/components/picker';
import { useDateUtils } from '../DatePicker/utils';
import { DatePicker, Form } from 'antd-mobile';
import { RangPickItem } from '../../type';
import Clear from '../_components/Clear';
import { FC, useRef } from 'react';
import dayjs from 'dayjs';

const FilterRangPicker: FC<RangPickItem> = ({ name, label, format, precision = 'day', placeholder = ['请选择日期', '请选择日期'] }) => {
    const handleRef = useRef<number>(0);
    const startRef = useRef<PickerActions>(null);
    const endRef = useRef<PickerActions>(null);

    const { defaultFormat, distance, renderLabel } = useDateUtils(precision);

    return (
        <Form.Subscribe to={name}>
            {(subscribeValue, form) => {
                const endKey = name[1];
                const startKey = name[0];
                const endValue = subscribeValue[endKey];
                const startValue = subscribeValue[startKey];
                const clear = () => {
                    form.setFieldsValue({ [startKey]: null, [endKey]: null });
                };

                const list = [
                    {
                        ref: startRef,
                        nextRef: endRef,
                        _name: startKey,
                        _label: label[0],
                        currentValue: startValue,
                        _precision: precision,
                        _placeholder: placeholder[0],
                        max: endValue ? distance(endValue, 'subtract') : undefined,
                        _format: Array.isArray(format) ? format[0] : format || defaultFormat,
                    },
                    {
                        ref: endRef,
                        nextRef: startRef,
                        _name: endKey,
                        _label: label[1],
                        currentValue: endValue,
                        _precision: precision,
                        _placeholder: placeholder[1],
                        min: startValue ? distance(startValue, 'add') : undefined,
                        _format: Array.isArray(format) ? format[1] : format || defaultFormat,
                    },
                ];

                return list.map(({ ref, nextRef, max, min, _name, _label, _placeholder, _format, _precision, currentValue }) => {
                    // 清除箭头
                    const arrow = currentValue ? <Clear clear={clear} /> : true;

                    const onCancel = () => {
                        handleRef.current = 0;
                        if (!(startValue && endValue)) {
                            clear();
                        }
                    };

                    const onConfirm = () => {
                        handleRef.current++;
                        if (handleRef.current === 1) {
                            nextRef.current?.open();
                        } else {
                            handleRef.current = 0;
                        }
                    };

                    return (
                        <Form.Item
                            key={_name}
                            name={_name}
                            arrow={arrow}
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
                                onCancel={onCancel}
                                onConfirm={onConfirm}
                                precision={_precision}
                                renderLabel={renderLabel}
                            >
                                {(value) => {
                                    return value ? (
                                        dayjs(value).format(_format)
                                    ) : (
                                        <span style={{ color: 'var(--adm-color-light)' }}>{_placeholder}</span>
                                    );
                                }}
                            </DatePicker>
                        </Form.Item>
                    );
                });
            }}
        </Form.Subscribe>
    );
};

export default FilterRangPicker;
