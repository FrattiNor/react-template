/* eslint-disable react-refresh/only-export-components */
import { VirtualTreeContextHoc, useVirtualTreeContext } from '../TreeContext';
import styles from './index.module.less';
import Checkbox from '@pkg/checkbox';
import classNames from 'classnames';
import Loading from '@pkg/loading';
import ArrowSvg from './ArrowSvg';
import Empty from '@pkg/empty';
import { FC } from 'react';

const Tree: FC = () => {
    const contextData = useVirtualTreeContext();
    const { virtual, props } = contextData;
    const { select } = props;
    const { virtualItems, totalSize, measureElement, distance } = virtual;
    const { renderItem, loading, style, className, wrapperClassName, wrapperStyle } = props;
    const { wrapperRef, lineHeight, showData, setVisibles, isEmpty, selectedKeysObj, setSelectedKeysObj } = contextData;

    return (
        <div className={classNames(styles['wrapper'], wrapperClassName)} style={wrapperStyle}>
            <Loading loading={loading} />

            <div ref={wrapperRef} className={classNames(styles['tree'], className)} style={style}>
                {isEmpty && (
                    <div className={styles['empty']}>
                        <Empty />
                    </div>
                )}

                {!isEmpty && (
                    <div className={styles['virtual-tree']} style={{ height: totalSize, paddingTop: distance }}>
                        {virtualItems.map((verticalItem) => {
                            const currentRowIndex = verticalItem.index;
                            const currentRowData = showData?.[currentRowIndex];

                            if (currentRowData) {
                                const { data, key, label, isLeaf, visible, level } = currentRowData;

                                return (
                                    <div
                                        key={key}
                                        ref={measureElement}
                                        data-index={currentRowIndex}
                                        className={styles['tree-row']}
                                        style={{ minHeight: lineHeight, paddingLeft: level * 18 }}
                                    >
                                        {!isLeaf ? (
                                            <div
                                                onClick={() => setVisibles((old) => ({ ...old, [key]: !old[key] }))}
                                                className={classNames(styles['arrow'], { [styles['visible']]: visible })}
                                            >
                                                <ArrowSvg />
                                            </div>
                                        ) : (
                                            <div className={styles['empty-arrow']} />
                                        )}

                                        {select === 'checkbox' && (
                                            <Checkbox checked={selectedKeysObj[key]} onChange={(c) => setSelectedKeysObj({ [key]: c })} />
                                        )}

                                        <div className={styles['content']}>
                                            {renderItem ? renderItem(data, currentRowData) : <div className={styles['label']}>{label}</div>}
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VirtualTreeContextHoc(Tree);
