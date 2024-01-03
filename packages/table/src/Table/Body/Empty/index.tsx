import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';
import Empty from '@pkg/empty';

const BodyEmpty = () => {
    const { innerProps } = useTableContext();
    const { horizontalTotalSize } = innerProps;

    return (
        <div className={styles['empty-wrapper']}>
            <div className={styles['space-occupying']} style={{ width: horizontalTotalSize }} />
            <div className={styles['empty']}>
                <Empty />
            </div>
        </div>
    );
};

export default BodyEmpty;
