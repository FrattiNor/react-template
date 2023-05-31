import BoxShadow from '@/components/Header/boxShadow';
import Horizontal2 from '@/components/Horizontal';
import FactorySelect from './factorySelect';
import styles from './index.module.less';

const Overview = () => {
    return (
        <BoxShadow>
            <Horizontal2>
                <div className={styles['wrapper']}>
                    <FactorySelect />
                </div>
            </Horizontal2>
        </BoxShadow>
    );
};

export default Overview;
