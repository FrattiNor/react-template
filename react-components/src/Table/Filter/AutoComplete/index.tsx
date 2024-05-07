import { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';

import styles from './index.module.less';
import Template from '../_Template';

type FilterAutoCompleteProps<T> = {
    width?: number;
    closeDropdown: () => void;
    value: string | undefined;
    submit: (nextValue: string | undefined) => void;
    reset: () => void;
    option?: T[];
    fieldKeys: { value: keyof T; label: keyof T };
    onSearch: (keyword: string) => void;
};

const AutoCompleteFC = <T,>(props: FilterAutoCompleteProps<T>) => {
    const { width, value, submit: _submit, reset: _reset, closeDropdown, option, fieldKeys, onSearch } = props;
    const [visible, setVisible] = useState(false);
    const [innerValue, setInnerValue] = useState(() => value);

    const submit = () => {
        _submit(innerValue);
        closeDropdown();
    };

    const reset = () => {
        _reset();
        closeDropdown();
    };

    // 如果是打开状态，再次点击触发关闭
    const onMouseDown = () => {
        if (visible === true) {
            setVisible(false);
        }
    };

    // 如果是关闭状态，再次点击回车触发提交
    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.code === 'Enter' || e.key === 'Enter' || e.keyCode === 13) {
            // 如果没有选项值，或者是关闭状态
            if ((visible === true && (option ?? []).length === 0) || visible === false) {
                setVisible(false); // 阻止默认的点击enter open事件
                e.stopPropagation();
                submit();
            }
        }
    };

    const options = (() => {
        if (fieldKeys.label === 'label' && fieldKeys.value === 'value') {
            return option as { label: T[keyof T]; value: T[keyof T] }[];
        }
        return option?.map((item) => ({
            label: item[fieldKeys.label],
            value: item[fieldKeys.value],
        }));
    })();

    return (
        <Template width={width} submit={submit} reset={reset}>
            <div className={styles['auto-complete']}>
                <AutoComplete
                    open={visible}
                    options={options}
                    value={innerValue}
                    style={{ width: '100%' }}
                    onDropdownVisibleChange={setVisible}
                    onChange={(v) => {
                        onSearch(v);
                        setInnerValue(v);
                    }}
                >
                    <Input
                        allowClear
                        onKeyDown={onKeyDown}
                        onMouseDown={onMouseDown}
                        suffix={<SearchOutlined style={{ color: 'var(--theme-placeholder-foreground)' }} />}
                    />
                </AutoComplete>
            </div>
        </Template>
    );
};

export default AutoCompleteFC;
