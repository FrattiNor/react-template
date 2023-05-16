import LoadingIcon from '../LoadingIcon';
import styles from './index.module.less';
import { Props } from '../../type';
import List from '../List';

function Wrapper<T>(props: Props<T>) {
    const loading = props.query.loading;

    return (
        <div className={styles['wrapper']}>
            {loading && (
                <div className={styles['loading']}>
                    <LoadingIcon className={styles['icon']} />
                </div>
            )}
            {!loading && <List {...props} />}
        </div>
    );
}

export default Wrapper;
