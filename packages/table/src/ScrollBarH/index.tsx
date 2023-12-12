import { useContext2 } from '../Context2';
import styles from './index.module.less';

const ScrollBarH = () => {
    const { scrollBar, virtual } = useContext2();
    const { hScrollBarWidth } = scrollBar;
    const { horizontalTotalSize } = virtual;

    if (hScrollBarWidth > 0) {
        return (
            <div className={styles['h-scroll-bar']} style={{ height: hScrollBarWidth, maxHeight: hScrollBarWidth, minHeight: hScrollBarWidth }}>
                <div style={{ height: hScrollBarWidth, maxHeight: hScrollBarWidth, minHeight: hScrollBarWidth, width: horizontalTotalSize }} />
            </div>
        );
    }

    return null;
};

export default ScrollBarH;
