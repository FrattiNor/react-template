import { useContext2 } from '../../../Context2';
import styles from './index.module.less';

const ScrollBarH = () => {
    const { calcScrollBar, virtual, hScrollbarRef, virtualScrollHandler } = useContext2();
    const { onHScroll } = virtualScrollHandler;
    const { hScrollBarWidth } = calcScrollBar;
    const { horizontalTotalSize } = virtual;

    if (hScrollBarWidth > 0) {
        return (
            <div
                ref={hScrollbarRef}
                onScroll={onHScroll}
                className={styles['h-scroll-bar']}
                style={{ height: hScrollBarWidth, maxHeight: hScrollBarWidth, minHeight: hScrollBarWidth }}
            >
                <div style={{ height: hScrollBarWidth, maxHeight: hScrollBarWidth, minHeight: hScrollBarWidth, width: horizontalTotalSize }} />
            </div>
        );
    }

    return null;
};

export default ScrollBarH;
