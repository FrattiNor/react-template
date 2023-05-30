import styles from './index.module.less';
import SwitchContext from './context';
import classNames from 'classnames';
import { useContext } from 'react';

const Switch = () => {
    const { type, setType } = useContext(SwitchContext);

    return (
        <div className={styles['wrapper']}>
            <div className={classNames(styles['btn-top'], { [styles['active']]: type === 'history' })} onClick={() => setType('history')}>
                历史
            </div>
            <div className={classNames(styles['btn-bottom'], { [styles['active']]: type === 'realtime' })} onClick={() => setType('realtime')}>
                实时
            </div>
        </div>
    );
};

export default Switch;
