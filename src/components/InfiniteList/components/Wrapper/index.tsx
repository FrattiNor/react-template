import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import { Props } from '../../type';
import List from '../List';

function Wrapper<T>(props: Props<T>) {
    const loading = props.query.loading;

    return (
        <div className={styles['wrapper']}>
            {loading && (
                <div className={styles['loading']}>
                    <Iconfont icon="loading" className={styles['icon']} />
                </div>
            )}
            {!loading && <List {...props} />}
        </div>
    );
}

export default Wrapper;
