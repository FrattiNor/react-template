import styles from './index.module.less';
import { FloatProps } from './type';

function Float<T>({ style, position, children }: FloatProps<T>) {
    return (
        <div className={styles['float-btn']} style={{ position, ...(style || {}) }}>
            {children}
        </div>
    );
}

export default Float;
