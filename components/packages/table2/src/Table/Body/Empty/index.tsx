import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';
import { Fragment } from 'react';
import Empty from '@pkg/empty';

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
