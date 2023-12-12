import { useContext2 } from '../Context2';
import styles from './index.module.less';

const ScrollBarV = () => {
    const { scrollBar, virtual } = useContext2();
    const { vScrollBarWidth } = scrollBar;
    const { verticalTotalSize } = virtual;

    if (vScrollBarWidth > 0) {
        return (
            <div className={styles['v-scroll-bar']} style={{ width: vScrollBarWidth, maxWidth: vScrollBarWidth, minWidth: vScrollBarWidth }}>
                <div style={{ width: vScrollBarWidth, maxWidth: vScrollBarWidth, minWidth: vScrollBarWidth, height: verticalTotalSize }}></div>
            </div>
        );
    }

    return null;
};

export default ScrollBarV;
