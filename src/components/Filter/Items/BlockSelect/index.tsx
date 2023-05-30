import { Form, Selector } from 'antd-mobile';
import { BlockSelectItem } from '../../type';
import { FC, useMemo } from 'react';

const FilterBlockSelect: FC<BlockSelectItem<any>> = ({ name, label, columns, multiple, option, fieldKeys }) => {
    const options = useMemo(() => {
        return fieldKeys
            ? option.map((item) => ({
                  label: fieldKeys === 'isStringArray' ? item : item[fieldKeys.label],
                  value: fieldKeys === 'isStringArray' ? item : item[fieldKeys.value],
              }))
            : option;
    }, [JSON.stringify(option)]);

    return (
        <Form.Item name={name} label={label}>
            <Selector columns={columns} options={options} multiple={multiple} />
        </Form.Item>
    );
};

export default FilterBlockSelect;
