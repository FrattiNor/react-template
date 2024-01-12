import { useTableContext } from '../../TableContext';
import ResizableTitle from './ResizableTitle';
import { notEmpty } from '../../utils/empty';
import { HandledColumn } from '../../type';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const Head: FC = () => {
    const tableContext = useTableContext();
    const { rowHeight, virtual = 'both' } = tableContext.props;
    const { headRef, ping, midLeftPadding, midRightPadding, vScrollBarWidth } = tableContext;
    const { horizontalTotalSize, handledFixedLeftColumns, handledFixedRightColumns, handledMidColumns, handledTotalMidColumns } = tableContext;
    const midColumns = virtual === 'both' || virtual === 'horizontal' ? handledMidColumns : handledTotalMidColumns;
    const midStyle = virtual === 'both' || virtual === 'horizontal' ? { paddingLeft: midLeftPadding, paddingRight: midRightPadding } : {};

    const renderCell = (column: HandledColumn<any>) => {
        const { resize, title, key, width, align } = column;
        const cellValue = notEmpty(title);
        const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
        const cellTitle = isStr ? `${cellValue}` : '';

        return (
            <ResizableTitle
                key={key}
                cellKey={key}
                resize={resize}
                title={cellTitle}
                className={styles['head-cell']}
                style={{ width, textAlign: align }}
            >
                {isStr ? <div className={styles['head-cell-str']}>{cellValue}</div> : <div className={styles['head-cell-block']}>{cellValue}</div>}
            </ResizableTitle>
        );
    };

    return (
        <div className={styles['head']} ref={headRef}>
            <div className={styles['virtual-head']} style={{ transform: `translate3d(0, 0, 0)`, width: horizontalTotalSize + vScrollBarWidth }}>
                <div className={styles['head-row']} style={{ minHeight: rowHeight }}>
                    {handledFixedLeftColumns.length > 0 && (
                        <div className={classNames(styles['head-fixed-left'], { [styles['pinged']]: ping['left'] })}>
                            {handledFixedLeftColumns.map((column) => renderCell(column))}
                        </div>
                    )}

                    {midColumns.length > 0 && (
                        <div className={styles['head-mid']} style={midStyle}>
                            {midColumns.map((column) => renderCell(column))}
                        </div>
                    )}

                    {handledFixedRightColumns.length > 0 && (
                        <div className={classNames(styles['head-fixed-right'], { [styles['pinged']]: ping['right'] })}>
                            {handledFixedRightColumns.map((column) => renderCell(column))}
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
