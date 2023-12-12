import styles from './index.module.less';
import ScrollBarV from './ScrollBarV';
import Body from './Body';

const Middle = () => {
    return (
        <div className={styles['middle']}>
            <Body />
            <ScrollBarV />
        </div>
    );
};

export default Middle;
