import { useTableContext } from '../../TableContext';
import styles from './index.module.less';
import classNames from 'classnames';
import HeadCell from './HeadCell';
import { FC } from 'react';

const Head: FC = () => {
    const tableContext = useTableContext();
    const { rowHeight, virtual = true } = tableContext.props;
    const { headRef, ping, midLeftPadding, midRightPadding, vScrollBarWidth } = tableContext;
    const { horizontalTotalSize, handledFixedLeftColumns, handledFixedRightColumns, handledMidColumns, handledTotalMidColumns } = tableContext;
    const midColumns = virtual === true || virtual === 'horizontal' ? handledMidColumns : handledTotalMidColumns;
    const midStyle = virtual === true || virtual === 'horizontal' ? { paddingLeft: midLeftPadding, paddingRight: midRightPadding } : {};

    return (
        <div className={styles['head']} ref={headRef}>
            <div className={styles['virtual-head']} style={{ transform: `translate3d(0, 0, 0)`, width: horizontalTotalSize + vScrollBarWidth }}>
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
