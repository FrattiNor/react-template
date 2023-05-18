import LoadingIcon from '../../../LoadingIcon';
import { FC, useMemo, useState } from 'react';
import { Form, Picker } from 'antd-mobile';
import { SelectItem } from '../../type';

const FilterSelect: FC<SelectItem<any>> = ({ name, label, placeholder = '请选择', option, fieldKeys }) => {
    const [opt, setOpts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const opts = useMemo(() => (typeof option === 'function' ? opt : option), [opt, option]);

    const columns = useMemo(() => {
        return fieldKeys
            ? opts.map((item) => ({
                  label: item[fieldKeys.label],
                  value: item[fieldKeys.value],
                  ...(fieldKeys.key ? { key: item[fieldKeys.key] } : {}),
              }))
            : opts;
    }, [JSON.stringify(fieldKeys), JSON.stringify(opts)]);

    const getOption = async () => {
        if (typeof option === 'function') {
            setLoading(true);
            await option().then((v) => {
                if (v) setOpts(v);
            });
            setLoading(false);
        }
    };

    return (
        <Form.Item
            name={name}
            label={label}
            trigger="onConfirm"
            onClick={(_e, datePickerRef) => {
                getOption();
                datePickerRef.current?.open();
            }}
        >
            <Picker
                loading={loading}
                columns={[columns]}
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
