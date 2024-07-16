import type { FC } from 'react';
import { useState } from 'react';

import { InputNumber } from 'antd';

import styles from './index.module.less';
import { useTranslation } from '../../../Local';
import Template from '../_Template';

type FilterRangerInputNumberProps = {
    closeDropdown: () => void;
    startValue: string | undefined;
    endValue: string | undefined;
    reset: () => void;
    submit: (value: { startValue: string | undefined; endValue: string | undefined }) => void;
};

const RangeInput: FC<FilterRangerInputNumberProps> = (props) => {
    const { startValue, submit: _submit, endValue, reset: _reset, closeDropdown } = props;

    const { t1 } = useTranslation();

    const [innerEndValue, setInnerEndValue] = useState(() => endValue);
    const [innerStartValue, setInnerStartValue] = useState(() => startValue);

    const submit = () => {
        _submit({ startValue: innerStartValue, endValue: innerEndValue });
        if (closeDropdown) closeDropdown();
    };

    const reset = () => {
        _reset();
        closeDropdown();
    };

    return (
        <Template width={250} submit={submit} reset={reset}>
            <div className={styles['range-input-number']}>
                <div>
                    <span>{t1('package@table.low_limit')}</span>
                    <span> {':'}</span>
                    <InputNumber
                        controls={false}
                        value={innerStartValue}
                        style={{ width: '100%' }}
                        onChange={(v) => setInnerStartValue(v ?? undefined)}
                    />
                </div>
                <div>
                    <span>{t1('package@table.high_limit')}</span>
                    <span> {':'}</span>
                    <InputNumber
                        controls={false}
                        value={innerEndValue}
                        style={{ width: '100%' }}
                        onChange={(v) => setInnerEndValue(v ?? undefined)}
                    />
                </div>
            </div>
        </Template>
    );
};

export default RangeInput;
