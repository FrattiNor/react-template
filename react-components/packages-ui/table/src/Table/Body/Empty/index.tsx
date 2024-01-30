import { Fragment } from 'react';

import Empty from '@pkg/empty';

import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';

const BodyEmpty = () => {
    const { horizontalTotalSize } = useTableContext();

    return (
        <Fragment>
            <div className={styles['space-occupying']} style={{ width: horizontalTotalSize }} />
            <div className={styles['empty']}>
                <Empty />
            </div>
        </Fragment>
    );
};

export default BodyEmpty;
