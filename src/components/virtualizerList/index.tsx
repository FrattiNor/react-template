import LoadingIcon from '@/components/LoadingIcon';
import { VirtualizerListProps } from './type';
import styles from './index.module.less';
import classNames from 'classnames';
import List from './list';

function VirtualizerList<T>(props: VirtualizerListProps<T>) {
    const { loading, className, ...listProps } = props;

    return (
        <div className={classNames(styles['wrapper'], className)}>
            {loading && (
                <div className={styles['loading']}>
                    <LoadingIcon className={styles['icon']} />
                </div>
            )}

            {!loading && <List {...listProps} />}
        </div>
    );
}

export default VirtualizerList;
