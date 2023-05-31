import BoxShadow from '@/components/Header/boxShadow';
import Horizontal2 from '@/components/Horizontal';
import styles from './index.module.less';

const Overview = () => {
    return (
        <BoxShadow>
            <Horizontal2>
                <div className={styles['wrapper']}></div>
            </Horizontal2>
        </BoxShadow>
    );
};

export default Overview;
