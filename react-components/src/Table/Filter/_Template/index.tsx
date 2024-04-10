import type { FC, PropsWithChildren } from 'react';

import { Button } from 'antd';

import styles from './index.module.less';
import { useTranslation } from '../../../Local';

type TemplateProps = PropsWithChildren<{
    submit: () => void;
    reset: () => void;
    resetDisabled?: boolean;
    submitDisabled?: boolean;
    width?: number;
}>;

const Template: FC<TemplateProps> = ({ submit, reset, resetDisabled, submitDisabled, children, width }) => {
    const { t1 } = useTranslation();

    return (
        <div className={styles['wrapper']} style={{ width }}>
            {children}
            <div className={styles['submit-box']}>
                <Button type="link" size="small" disabled={resetDisabled} onClick={reset}>
                    {t1('package_ui@table.reset')}
                </Button>
                <Button type="primary" size="small" disabled={submitDisabled} onClick={submit}>
                    {t1('package_ui@table.submit')}
                </Button>
            </div>
        </div>
    );
};

export default Template;
