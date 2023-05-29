import BoxShadow from '@/components/Header/boxShadow';
import styles from './index.module.less';

const Overview = () => {
    return (
        <BoxShadow>
            <div className={styles['wrapper']}>
                <iframe
                    className={styles['iframe']}
                    src="http://10.50.0.49:8080/main/#/runtime-fullscreen/runtime-fullscreen/Page_2d2e5be61b4e4bc7bc0b84d00d7533fb"
                />
            </div>
        </BoxShadow>
    );
};

export default Overview;
