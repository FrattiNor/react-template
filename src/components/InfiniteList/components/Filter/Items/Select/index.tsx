import LoadingIcon from '../../../LoadingIcon';
import FilterSelectMultiple from './multiple';
import { Form, Picker } from 'antd-mobile';
import { SelectItem } from '../../type';
import { FC, useMemo } from 'react';

const FilterSelect: FC<SelectItem<any>> = ({ name, label, placeholder = '请选择', option, fieldKeys, multiple }) => {
    const query = typeof option === 'function' ? option() : null;
    const data = query?.data;
    const refetch = query?.refetch;
    const loading = query?.isFetching;

    const opts = useMemo(() => {
        const _opts = Array.isArray(option) ? option : data || [];
        return fieldKeys
            ? _opts.map((item) => ({
                  label: item[fieldKeys.label],
                  value: item[fieldKeys.value],
                  ...(fieldKeys.key ? { key: item[fieldKeys.key] } : {}),
              }))
            : _opts;
    }, [fieldKeys, data, option]);

    // 多选
    if (multiple) {
        return <FilterSelectMultiple opts={opts} loading={loading} refetch={refetch} name={name} label={label} placeholder={placeholder} />;
    }

    return (
        <Form.Item
            name={name}
            label={label}
            trigger="onConfirm"
            onClick={(_e, datePickerRef) => {
                if (refetch) refetch();
                datePickerRef.current?.open();
            }}
        >
            <Picker
                columns={[opts]}
                loading={loading}
                loadingContent={
                    <div className="adm-picker-view-loading-content">
                        <LoadingIcon />
                    </div>
                }
            >
                {(values) => {
                    if (Array.isArray(values) && values.length > 0) {
                        return values
                            .map((item) => item?.label)
                            .filter((item) => item)
                            .join(' ');
                    }
                    return <span style={{ color: 'var(--adm-color-light)' }}>{placeholder}</span>;
                }}
            </Picker>
        </Form.Item>
    );
};

export default FilterSelect;
