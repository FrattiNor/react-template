import { useTableContext } from '../../TableContext';
import ResizableTitle from './ResizableTitle';
import { notEmpty } from '../../utils/empty';
import { HandledColumn } from '../../type';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const Head: FC = () => {
    const { headRef, innerProps, outerProps } = useTableContext();

    const { rowHeight } = outerProps;
    const { resizeActiveKey, ping } = innerProps;
    const { midLeftPadding, midRightPadding, vScrollBarWidth } = innerProps;
    const { handledFixedLeftColumns, handledFixedRightColumns, handledMidColumns, horizontalTotalSize } = innerProps;

    const renderItem = (column: HandledColumn<any>) => {
        const { resize, title, key, width, align } = column;
        const cellValue = notEmpty(title);
        const resizeTitle = resize === undefined || resize === true;
        const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
        const cellTitle = isStr ? `${cellValue}` : '';
        const className = styles['head-cell'];

        const cellInner = isStr ? (
            <div className={styles['head-cell-str']}>{cellValue}</div>
        ) : (
            <div className={styles['head-cell-block']}>{cellValue}</div>
        );

        if (resizeTitle) {
            return (
                <ResizableTitle cellKey={key} key={key} title={cellTitle} style={{ width, textAlign: align }} className={className}>
                    {cellInner}
                </ResizableTitle>
            );
        } else {
            return (
                <div key={key} title={cellTitle} style={{ width, textAlign: align }} className={className}>
                    {cellInner}
                </div>
            );
        }
    };

    return (
        <div className={classNames(styles['head'], { [styles['resizing']]: !!resizeActiveKey })} ref={headRef}>
            <div className={styles['virtual-head']} style={{ transform: `translate3d(0, 0, 0)`, width: horizontalTotalSize + vScrollBarWidth }}>
                <div className={styles['head-row']} style={{ minHeight: rowHeight }}>
                    <div className={classNames(styles['head-fixed-left'], { [styles['pinged']]: ping['left'] })}>
                        {handledFixedLeftColumns.map((column) => renderItem(column))}
                    </div>

                    <div className={styles['head-mid']} style={{ paddingLeft: midLeftPadding, paddingRight: midRightPadding }}>
                        {handledMidColumns.map((column) => renderItem(column))}
                    </div>

                    <div className={classNames(styles['head-fixed-right'], { [styles['pinged']]: ping['right'] })}>
                        {handledFixedRightColumns.map((column) => renderItem(column))}
                        {vScrollBarWidth > 0 && <div className={classNames(styles['head-v-scroll-bar'])} style={{ width: vScrollBarWidth }} />}
                    </div>

                    <div className={styles['head-seize-a-seat']} />
                </div>
            </div>
        </div>
    );
};

export default Head;
