import type { FC } from 'react';

import classNames from 'classnames';

import HeadGroupRow from './HeadGroupRow';
import HeadRow from './HeadRow';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';

const isSafari = navigator.userAgent.match(/AppleWebKit/) && !navigator.userAgent.match(/Chrome/);

const Head: FC = () => {
    const tableContext = useTableContext();
    const { headRef } = tableContext;
    const { handledHeadGroups } = tableContext.handledColumnsObj;
    const { headGridTemplateColumns, headHorizontalTotalSize } = tableContext.columnsGridSizeAndSticky;

    return (
        <div className={styles['head-wrapper']}>
            <div className={classNames(styles['head'], { [styles['safari']]: isSafari })} ref={headRef}>
                <div className={styles['virtual-head']} style={{ width: headHorizontalTotalSize, gridTemplateColumns: headGridTemplateColumns }}>
                    {handledHeadGroups.map((_, rowIndex) => (
                        <HeadGroupRow key={rowIndex} rowIndex={rowIndex} />
                    ))}
                    <HeadRow rowIndex={handledHeadGroups.length} />
                </div>
            </div>
        </div>
    );
};

export default Head;
