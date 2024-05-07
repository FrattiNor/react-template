import type { FC } from 'react';

import classNames from 'classnames';

import { useTableContext } from '../../../TableContext';
import HeadCell from '../HeadCell';
import styles from '../index.module.less';

const HeadRow: FC = () => {
    const tableContext = useTableContext();

    const { ping, midLeftPadding, midRightPadding, vScrollBarWidth, handledProps } = tableContext;
    const { handledFixedLeftColumns, handledFixedRightColumns, handledMidColumns } = tableContext;

    const { rowHeight } = handledProps;
    const midColumns = handledMidColumns;
    const midStyle = { paddingLeft: midLeftPadding, paddingRight: midRightPadding };

    return (
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
    );
};

export default HeadRow;
