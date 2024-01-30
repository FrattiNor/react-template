import { FC } from 'react';

import classNames from 'classnames';

import HeadCell from './HeadCell';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';

const Head: FC = () => {
    const tableContext = useTableContext();
    const { rowHeight, virtual = true } = tableContext.props;
    const virtualH = virtual === true || virtual === 'horizontal';
    const { headRef, ping, midLeftPadding, midRightPadding, vScrollBarWidth } = tableContext;
    const { horizontalTotalSize, handledFixedLeftColumns, handledFixedRightColumns, handledMidColumns, handledTotalMidColumns } = tableContext;
    const midColumns = virtualH ? handledMidColumns : handledTotalMidColumns;
    const midStyle = virtualH ? { paddingLeft: midLeftPadding, paddingRight: midRightPadding } : {};

    return (
        <div className={styles['head']} ref={headRef}>
            <div className={styles['virtual-head']} style={{ width: horizontalTotalSize + vScrollBarWidth }}>
                <div className={styles['head-row']} style={{ minHeight: rowHeight }}>
                    {handledFixedLeftColumns.length > 0 && (
                        <div className={classNames(styles['head-fixed-left'], { [styles['pinged']]: ping['left'] })}>
                            {handledFixedLeftColumns.map((column) => (
                                <HeadCell key={column.key} column={column} />
                            ))}
                        </div>
                    )}

                    {midColumns.length > 0 && (
                        <div className={styles['head-mid']} style={midStyle}>
                            {midColumns.map((column) => (
                                <HeadCell key={column.key} column={column} />
                            ))}
                        </div>
                    )}

                    {handledFixedRightColumns.length > 0 && (
                        <div className={classNames(styles['head-fixed-right'], { [styles['pinged']]: ping['right'] })}>
                            {handledFixedRightColumns.map((column) => (
                                <HeadCell key={column.key} column={column} />
                            ))}
                            {vScrollBarWidth > 0 && <div className={classNames(styles['head-v-scroll-bar'])} style={{ width: vScrollBarWidth }} />}
                        </div>
                    )}

                    <div className={styles['head-seize-a-seat']} />
                </div>
            </div>
        </div>
    );
};

export default Head;
