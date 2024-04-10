import type { FC } from 'react';
import { useState } from 'react';

import { Input } from 'antd';

import styles from './index.module.less';
import Template from '../_Template';

type FilterInputProps = {
    afterSubmit?: () => void;
    value: string | undefined;
    setValue: (nextValue: string | undefined) => void;
};

const InputFC: FC<FilterInputProps> = ({ value, setValue, afterSubmit }) => {
    const [innerValue, setInnerValue] = useState(() => value);
    const haveValue = typeof innerValue === 'string' && innerValue !== '';

    const submit = () => {
        setValue(innerValue);
        if (afterSubmit) afterSubmit();
    };

    const reset = () => {
        setInnerValue(undefined);
    };

    return (
        <Template submit={submit} reset={reset} resetDisabled={!haveValue}>
            <div className={styles['input']}>
                <Input
                    allowClear
                    value={innerValue}
                    onPressEnter={submit}
                    style={{ width: '100%' }}
                    onChange={(e) => setInnerValue(e.target.value)}
                />
            </div>
        </Template>
    );
};

export default InputFC;
