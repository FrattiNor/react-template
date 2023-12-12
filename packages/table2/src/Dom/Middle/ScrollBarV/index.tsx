import { useContext2 } from '../../../Context2';
import styles from './index.module.less';

const ScrollBarV = () => {
    const { calcScrollBar, virtual, vScrollbarRef, virtualScrollHandler } = useContext2();
    const { onVScroll } = virtualScrollHandler;
    const { vScrollBarWidth } = calcScrollBar;
    const { verticalTotalSize } = virtual;

    if (vScrollBarWidth > 0) {
        return (
            <div
                ref={vScrollbarRef}
                onScroll={onVScroll}
                className={styles['v-scroll-bar']}
                style={{ width: vScrollBarWidth, maxWidth: vScrollBarWidth, minWidth: vScrollBarWidth }}
            >
                <div style={{ width: vScrollBarWidth, maxWidth: vScrollBarWidth, minWidth: vScrollBarWidth, height: verticalTotalSize }}></div>
            </div>
        );
    }

    return null;
};

export default ScrollBarV;
