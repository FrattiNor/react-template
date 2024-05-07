import type { FC } from 'react';

import HeadRow from './HeadRow';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';

const Head: FC = () => {
    const tableContext = useTableContext();
    const { headRef, vScrollBarWidth, horizontalTotalSize } = tableContext;

    return (
        <div className={styles['head']} ref={headRef}>
            <div className={styles['virtual-head']} style={{ width: horizontalTotalSize + vScrollBarWidth }}>
                <HeadRow />
            </div>
        </div>
    );
};

export default Head;
