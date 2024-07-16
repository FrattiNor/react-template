import type { FC, PropsWithChildren, ReactNode } from 'react';

import { Button } from 'antd';

import styles from './index.module.less';
import { useTranslation } from '../../../Local';

type TemplateProps = PropsWithChildren<{
    submit: () => void;
    reset: () => void;
    resetDisabled?: boolean;
    submitDisabled?: boolean;
    width?: number;
    btns?: null | ReactNode;
}>;

const Template: FC<TemplateProps> = ({ submit, reset, resetDisabled, submitDisabled, children, width, btns }) => {
    const { t1 } = useTranslation();

    return (
        <div className={styles['wrapper']} style={{ width }}>
            {children}
            {btns !== undefined ? (
                btns
            ) : (
                <div className={styles['submit-box']}>
                    <Button type="link" size="small" disabled={resetDisabled} onClick={reset}>
                        {t1('package@table.reset')}
                    </Button>
                    <Button type="primary" size="small" disabled={submitDisabled} onClick={submit}>
                        {t1('package@table.search')}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Template;
