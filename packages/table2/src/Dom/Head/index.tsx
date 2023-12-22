import { notEmpty } from '@pkg/utils/src/empty';
import ResizableTitle from './ResizableTitle';
import { useContext2 } from '../../Context2';
import { HandledColumn } from '../../type';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const Head: FC = () => {
    const { headRef, innerProps, outerProps } = useContext2();

    const { rowHeight } = outerProps;
    const { resizeActiveKey, ping, resized } = innerProps;
    const { midLeftPadding, midRightPadding, vScrollBarWidth } = innerProps;
    const { handledFixedLeftColumns, handledFixedRightColumns, handledMidColumns, horizontalTotalSize } = innerProps;

    const renderItem = (column: HandledColumn<any>) => {
        const { resize, title, key, width, hiddenDivider } = column;
        const cellValue = notEmpty(title);
        const resizeTitle = resize === undefined || resize === true;
        const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
        const cellTitle = isStr ? `${cellValue}` : '';
        const cellInner = isStr ? <div className={styles['head-cell-str']}>{cellValue}</div> : cellValue;
        const className = classNames(styles['head-cell'], {
            [styles['hidden-divider']]: hiddenDivider,
        });
        if (resizeTitle) {
            return (
                <ResizableTitle key={key} cellKey={key} title={cellTitle} style={{ width }} className={className}>
                    {cellInner}
                </ResizableTitle>
            );
        } else {
            return (
                <div key={key} title={cellTitle} style={{ width }} className={className}>
                    {cellInner}
                </div>
            );
        }
    };

    return (
        <div className={classNames(styles['head'], { [styles['resizing']]: !!resizeActiveKey })} ref={headRef}>
            <div className={styles['virtual-head']} style={{ transform: `translate3d(0, 0, 0)`, width: horizontalTotalSize + vScrollBarWidth }}>
                <div className={styles['head-row']} style={{ minHeight: rowHeight }}>
                    {handledFixedLeftColumns.length > 0 && (
                        <div className={classNames(styles['head-fixed-left'], { [styles['pinged']]: ping['left'] })}>
                            {handledFixedLeftColumns.map((column) => renderItem(column))}
                        </div>
                    )}
                    {handledMidColumns.length > 0 && (
                        <div className={styles['head-mid']} style={{ paddingLeft: midLeftPadding, paddingRight: midRightPadding }}>
                            {handledMidColumns.map((column) => renderItem(column))}
                        </div>
                    )}
                    {handledFixedRightColumns.length > 0 && (
                        <div className={classNames(styles['head-fixed-right'], { [styles['pinged']]: ping['right'] })}>
                            {handledFixedRightColumns.map((column) => renderItem(column))}
                            {vScrollBarWidth > 0 && <div className={classNames(styles['head-v-scroll-bar'])} style={{ width: vScrollBarWidth }} />}
                        </div>
                    )}

                    {resized && <div className={styles['head-seize-a-seat']} />}
                </div>
            </div>
        </div>
    );
};

export default Head;
