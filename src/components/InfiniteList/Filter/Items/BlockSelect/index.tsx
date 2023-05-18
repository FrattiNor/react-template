import { Form, Selector } from 'antd-mobile';
import { BlockSelectItem } from '../../type';
import { FC, useMemo } from 'react';

const FilterBlockSelect: FC<BlockSelectItem<any>> = ({ name, label, columns, multiple, option, fieldKeys }) => {
    const options = useMemo(() => {
        return fieldKeys
            ? option.map((item) => ({
                  label: item[fieldKeys.label],
                  value: item[fieldKeys.value],
                  ...(fieldKeys.key ? { key: item[fieldKeys.key] } : {}),
              }))
            : option;
    }, [JSON.stringify(fieldKeys), JSON.stringify(option)]);

    return (
        <Form.Item name={name} label={label}>
            <Selector columns={columns} options={options} multiple={multiple} />
        </Form.Item>
    );
};

export default FilterBlockSelect;
