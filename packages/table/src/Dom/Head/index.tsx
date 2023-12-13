import { notEmpty } from '@pkg/utils/src/empty';
import ResizableTitle from './ResizableTitle';
import { useContext2 } from '../../Context2';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const Head: FC = () => {
    const { virtual, headRef, innerProps, newProps } = useContext2();

    const { rowHeight } = newProps;
    const { ping, vScrollBarWidth, resized } = innerProps;
    const { horizontalVirtualItems, horizontalTotalSize, horizontalDistance } = virtual;
    const { handledColumns, hiddenFixedHandledLeftColumns, hiddenFixedHandledRightColumns, hiddenFixedTotalSize } = innerProps;
    const renderItems = [...hiddenFixedHandledLeftColumns, ...horizontalVirtualItems, ...hiddenFixedHandledRightColumns];

    return (
        <div className={styles['head']} ref={headRef}>
            <div className={styles['virtual-head']} style={{ width: horizontalTotalSize + vScrollBarWidth }}>
                <div
                    className={styles['virtual-head-inner']}
                    style={{ transform: `translate3d(0, 0, 0)`, paddingLeft: `${horizontalDistance - hiddenFixedTotalSize}px` }}
                >
                    <div className={styles['head-row']} style={{ height: rowHeight, lineHeight: `${rowHeight}px` }}>
                        {renderItems.map((item) => {
                            const column = handledColumns[item.index];
                            if (column) {
                                const { resize, title, key, widthStyle, align, fixed, headFixedStyle, showShadow } = column;
                                const cellValue = notEmpty(title);
                                const pinged = ping[fixed as any];
                                const resizeTitle = resize === undefined || resize === true;
                                const cellTitle = typeof cellValue === 'string' || typeof cellValue === 'number' ? `${cellValue}` : '';
                                const cellInner = <div className={styles['head-cell-inner']}>{cellValue}</div>;
                                const style = { textAlign: align, ...widthStyle, ...(headFixedStyle ?? {}) };
                                const className = classNames(styles['head-cell'], {
                                    [styles[`fixed-${fixed}`]]: !!fixed,
                                    [styles[`shadow`]]: showShadow,
                                    [styles[`pinged`]]: pinged,
                                });

                                if (resizeTitle) {
                                    return (
                                        <ResizableTitle key={key} cellKey={key} title={cellTitle} style={style} className={className}>
                                            {cellInner}
                                        </ResizableTitle>
                                    );
                                } else {
                                    return (
                                        <div key={key} title={cellTitle} style={style} className={className}>
                                            {cellInner}
                                        </div>
                                    );
                                }
                            }
                        })}

                        {resized && <div className={styles['head-cell']} style={{ width: 0, flexGrow: 1, padding: 0 }} />}

                        {vScrollBarWidth > 0 && (
                            <div className={classNames(styles['head-cell'], styles['fixed-right'])} style={{ width: vScrollBarWidth, padding: 0 }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Head;
