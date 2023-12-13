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
                    <div className={styles['head-row']} style={{ height: rowHeight }}>
                        {renderItems.map((item) => {
                            const column = handledColumns[item.index];
                            if (column) {
                                const { resize, title, key, fixed, headStyle } = column;
                                const cellValue = notEmpty(title);
                                const pinged = ping[fixed as any];
                                const resizeTitle = resize === undefined || resize === true;
                                const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
                                const cellTitle = isStr ? `${cellValue}` : '';
                                const cellInner = isStr ? <div className={styles['head-cell-str']}>{cellValue}</div> : cellValue;
                                const className = classNames(styles['head-cell'], {
                                    [styles[`fixed-${fixed}`]]: !!fixed,
                                    [styles[`pinged`]]: pinged,
                                    [styles[`shadow`]]: true,
                                });

                                if (resizeTitle) {
                                    return (
                                        <ResizableTitle key={key} cellKey={key} title={cellTitle} style={headStyle} className={className}>
                                            {cellInner}
                                        </ResizableTitle>
                                    );
                                } else {
                                    return (
                                        <div key={key} title={cellTitle} style={headStyle} className={className}>
                                            {cellInner}
                                        </div>
                                    );
                                }
                            }
                        })}

                        {resized && <div className={styles['head-cell-other']} style={{ width: 0, flexGrow: 1 }} />}

                        {vScrollBarWidth > 0 && (
                            <div className={classNames(styles['head-cell-other'], styles['fixed-right'])} style={{ width: vScrollBarWidth }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Head;
