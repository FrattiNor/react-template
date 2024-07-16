import styles from './index.module.less';
import Empty from '../../../../Empty';
import { useTableContext } from '../../../TableContext';

const BodyEmpty = () => {
    const tableContext = useTableContext();
    const { horizontalTotalSize } = tableContext.columnsGridSizeAndSticky;

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
